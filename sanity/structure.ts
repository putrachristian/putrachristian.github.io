import type {StructureResolver} from 'sanity/structure'

const singleton = (S: Parameters<StructureResolver>[0], title: string, schemaType: string, documentId: string) =>
  S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      singleton(S, 'Profile', 'siteProfile', 'siteProfile'),
      singleton(S, 'Home Hero', 'homeHero', 'homeHero'),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('speakingEntry').title('Talks'),
      S.documentTypeListItem('experienceEntry').title('Experience'),
      S.documentTypeListItem('skillGroup').title('Skills'),
      S.documentTypeListItem('processStep').title('Process'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.divider(),
      singleton(S, 'AI Chat', 'chatSettings', 'chatSettings'),
    ])
