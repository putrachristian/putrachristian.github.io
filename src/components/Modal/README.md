# Modal Component

A reusable, accessible modal component built with React and modern best practices.

## Features

- **Accessibility**: Full keyboard navigation, focus management, and ARIA attributes
- **Performance**: Uses React Portal for optimal rendering
- **Responsive**: Works on all screen sizes
- **Customizable**: Easy to style and extend
- **TypeScript Ready**: Built with TypeScript in mind

## Usage

### Basic Modal

```jsx
import Modal from "./components/Modal"

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
        <p>Modal content goes here</p>
      </Modal>
    </>
  )
}
```

### Modal without Title

```jsx
<Modal isOpen={isOpen} onClose={onClose}>
  <div className="custom-content">
    <h2>Custom Header</h2>
    <p>Content without title prop</p>
  </div>
</Modal>
```

### Styled Modal

```jsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  className="my-custom-modal"
  title="Custom Styled Modal"
>
  <div className="custom-body">
    <p>This modal has custom styling</p>
  </div>
</Modal>
```

## Props

| Prop        | Type        | Default | Description                        |
| ----------- | ----------- | ------- | ---------------------------------- |
| `isOpen`    | `boolean`   | `false` | Controls modal visibility          |
| `onClose`   | `function`  | -       | Callback when modal should close   |
| `children`  | `ReactNode` | -       | Modal content                      |
| `title`     | `string`    | -       | Optional modal title (adds header) |
| `className` | `string`    | `""`    | Additional CSS classes             |

## Accessibility Features

- **Focus Management**: Automatically focuses modal when opened, restores focus when closed
- **Keyboard Navigation**: ESC key closes modal
- **ARIA Attributes**: Proper `role="dialog"` and `aria-modal="true"`
- **Click Outside**: Clicking overlay closes modal
- **Screen Reader Support**: Proper labeling and announcements

## Styling

The modal uses CSS custom properties for easy theming:

```scss
.modal-overlay {
  // Overlay background
  background: rgba(0, 0, 0, 0.8);

  // Backdrop blur effect
  backdrop-filter: blur(10px);
}

.modal-content {
  // Modal background
  background: rgba(255, 255, 255, 0.1);

  // Border and shadow
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
}
```

## Examples

### ProjectModal

See `ProjectModal` component for a specialized implementation with image gallery and project details.

### Custom Modal

```jsx
const CustomModal = ({ isOpen, onClose, data }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Custom Modal"
    className="custom-modal"
  >
    <div className="modal-content">
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <div className="modal-actions">
        <button onClick={onClose}>Close</button>
        <button onClick={data.onConfirm}>Confirm</button>
      </div>
    </div>
  </Modal>
)
```

## Performance Notes

- Uses React Portal to render outside component tree
- Prevents body scroll when modal is open
- Optimized with `useCallback` for event handlers
- Minimal re-renders with proper memoization
