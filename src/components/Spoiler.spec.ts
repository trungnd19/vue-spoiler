import { test, expect, describe, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Spoiler from './Spoiler.vue'

describe('Test Vue Spoiler', () => {

  test('Spoiler renders with default state', () => {
    const wrapper = mount(Spoiler);

    // Assert default state
    expect(wrapper.find('.spoiler').exists()).toBe(true)
    expect(wrapper.find('.spoiler').classes()).toContain('hide')
    expect(wrapper.find('.spoiler').attributes('title')).toBe('Click to reveal')
    expect(wrapper.props('tagBackgroundColor')).toBe('#131313')
    expect(wrapper.props('tagTextColor')).toBe('transparent')
    expect(wrapper.props('hoverMode')).toBe(false)
  })

  test('pass title props', () => {
    const titleProp = 'Tooltip props text'
    const wrapper = mount(Spoiler, {
      props: {
        tooltipText: titleProp
      }
    })

    expect(wrapper.attributes('title')).toBe(titleProp)
  })

  test('title props default value', () => {
    const defaultTitle = 'Click to reveal'
    const wrapper = mount(Spoiler)
    expect(wrapper.attributes('title')).toBe(defaultTitle)
  })

  test('Not showing title attribute after click', async () => {
    const wrapper = mount(Spoiler)
    await wrapper.trigger('click')
    expect(wrapper.attributes('title')).toBe('')
  })

  test('Click to reveal text, hoverMode is false', async () => {
    const wrapper = mount(Spoiler)
    const spoilerTag = wrapper.find('.spoiler')

    // Default: 'hide' class
    expect(spoilerTag.classes()).toContain('hide')

    await wrapper.trigger('click')

    // After click: 'reveal' class
    expect(spoilerTag.classes()).toContain('reveal')
  })

  test('Mouse over and mouse leave event, hoverMode is true', async () => {
    const wrapper = mount(Spoiler, {
      props: {
        hoverMode: true
      }
    })

    const spoilerTag = wrapper.find('.spoiler')
    await wrapper.trigger('mouseover')
    expect(spoilerTag.classes()).toContain('reveal')

    await wrapper.trigger('mouseleave')
    expect(spoilerTag.classes()).toContain('hide')
  })

  test('Render slot text only', () => {
    const testHideText = 'Test hide text'
    const wrapper = mount(Spoiler, {
      slots: {
        default: testHideText
      }
    })
    expect(wrapper.find('.spoiler').text()).toContain(testHideText)
  })

  test('Render slot using element', () => {
    const element = '<div>Test hide text</div>'
    const wrapper = mount(Spoiler, {
      slots: {
        default: element
      }
    })
    expect(wrapper.find('.spoiler').html()).toContain(element)
  })

  test('Emit event on show spoiler', async () => {
    const wrapper = mount(Spoiler)
    await wrapper.trigger('click')
    expect(wrapper.emitted('reveal')?.[0])?.toEqual([true])
  })

  test('Emit event on hover mode', async () => {
    const wrapper = mount(Spoiler, {
      props: {
        hoverMode: true
      }
    })

    await wrapper.trigger('mouseover')
    const emittedEvent = wrapper.emitted('reveal')
    expect(emittedEvent?.[0])?.toEqual([true])

    await wrapper.trigger('mouseleave')
    expect(emittedEvent?.[1])?.toEqual([false])
  })
})
