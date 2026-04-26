import { access } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function localApiPlugin(root: string) {
  return {
    name: 'local-api-routes',
    configureServer(server: { middlewares: { use: (handler: (req: any, res: any, next: (error?: unknown) => void) => void | Promise<void>) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? new URL(req.url, 'http://localhost') : null

        if (!url || !url.pathname.startsWith('/api/')) {
          next()
          return
        }

        const routeName = url.pathname.replace(/^\/api\//, '').replace(/\/+$/, '')
        const handlerPath = path.join(root, 'api', `${routeName}.js`)

        try {
          await access(handlerPath)
        } catch {
          next()
          return
        }

        try {
          const chunks: Buffer[] = []

          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
          }

          const rawBody = Buffer.concat(chunks).toString('utf8')
          let parsedBody: unknown = undefined

          if (rawBody) {
            try {
              parsedBody = JSON.parse(rawBody)
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid JSON body.' }))
              return
            }
          }

          const moduleUrl = `${pathToFileURL(handlerPath).href}?t=${Date.now()}`
          const routeModule = await import(moduleUrl)
          const handler = routeModule.default

          if (typeof handler !== 'function') {
            throw new Error(`API route ${routeName} does not export a default handler.`)
          }

          req.body = parsedBody
          req.query = Object.fromEntries(url.searchParams.entries())

          let responseEnded = false
          const response = {
            status(code: number) {
              res.statusCode = code
              return response
            },
            json(payload: unknown) {
              if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json')
              }
              responseEnded = true
              res.end(JSON.stringify(payload))
              return response
            },
            send(payload: string) {
              responseEnded = true
              res.end(payload)
              return response
            },
          }

          await handler(req, response)

          if (!responseEnded && !res.writableEnded) {
            res.statusCode = res.statusCode || 204
            res.end()
          }
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root, '')

  Object.assign(process.env, env)

  return {
    plugins: [react(), localApiPlugin(root)],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
    },
  }
})
