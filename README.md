<h1  align="center">
	Vue Spoiler Tag
</h1>
<p  align="center">Lightweight Vue component to hide text until the user clicks or hovers, inspired by Reddit spoiler tag.</p>

## 🚀 Features

- 🎪 [**Demo & Playground**](https://stackblitz.com/edit/vitejs-vite-zl2e2d)

- 🕶 **Seamless migration**: Works for **both** Vue 3 and 2

- 🦾 **Type Strong**: Written in [TypeScript](https://www.typescriptlang.org/)

- 🔋 **SSR Friendly**: Nuxt, Vitepress are supported

- 🔩 **Easy to use**: Just import the component, pass in the content you want to hide and voila, you are good to go!

## 📦 Install

```bash
npm  i  vue-spoiler
```

## 🦄 Usage

```vue
<script setup lang="ts">
import { Spoiler } from 'vue-spoiler'
</script>
<template>
  // Hide your text content
  <Spoiler>Your text to hide</Spoiler>

  // Hide your elements/ component
  <Spoiler>
    <YourComponent />
  </Spoiler>
</template>
```

## API

### Props

| Props              | Type      | Default         | Required | Description                          |
| ------------------ | --------- | --------------- | -------- | ------------------------------------ |
| tagBackgroundColor | `string`  | #131313         | no       | Background color of hidden state     |
| tagTextColor       | `string`  | transparent     | no       | Text color of hidden state           |
| tooltipText        | `string`  | Click to reveal | no       | Tooltip shown on hover               |
| hoverMode          | `boolean` | false           | no       | Change to hover to show content mode |

### Events

| Events   | Descriptions                                                                         |
| -------- | ------------------------------------------------------------------------------------ |
| (reveal) | Fired when content is clicked (hoverMode false) or when content is hovered/unhovered |

## License

MIT © [trungnd19](https://github.com/trungnd19)
