<template>
  <component
    :is="iconComponent"
    class="icon"
    :class="[`icon--${name}`, sizeClass, { 'icon--solid': variant === 'solid' }]"
    :aria-label="ariaLabel || name"
    role="img"
  />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

// Import Heroicons (same as before)
import {
  HeartIcon,
  SunIcon,
  CloudIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  HomeIcon,
  MapPinIcon,
  MapIcon,
  Bars3Icon,
  ClockIcon,
  CalendarIcon,
  BellIcon,
  EnvelopeIcon,
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  CogIcon,
  UserIcon,
  StarIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

import {
  HeartIcon as HeartIconSolid,
  SunIcon as SunIconSolid,
  CloudIcon as CloudIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  InformationCircleIcon as InformationCircleIconSolid,
  XCircleIcon as XCircleIconSolid,
  HomeIcon as HomeIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/vue/24/solid'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'solid'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'outline',
  ariaLabel: ''
})

// Icon mapping (same as before)
const iconMap: Record<string, { outline: Component; solid?: Component }> = {
  'heart-pulse': { outline: HeartIcon, solid: HeartIconSolid },
  'heart': { outline: HeartIcon, solid: HeartIconSolid },
  'sun': { outline: SunIcon, solid: SunIconSolid },
  'cloud': { outline: CloudIcon, solid: CloudIconSolid },
  'thermometer': { outline: SunIcon },
  'droplets': { outline: CloudIcon },
  'wind': { outline: CloudIcon },
  'cloud-rain': { outline: CloudIcon },
  'check-circle': { outline: CheckCircleIcon, solid: CheckCircleIconSolid },
  'alert-triangle': { outline: ExclamationTriangleIcon, solid: ExclamationTriangleIconSolid },
  'alert-circle': { outline: ExclamationCircleIcon },
  'info': { outline: InformationCircleIcon, solid: InformationCircleIconSolid },
  'x-circle': { outline: XCircleIcon, solid: XCircleIconSolid },
  'refresh': { outline: ArrowPathIcon },
  'external-link': { outline: ArrowTopRightOnSquareIcon },
  'download': { outline: ArrowDownTrayIcon },
  'upload': { outline: ArrowUpTrayIcon },
  'home': { outline: HomeIcon, solid: HomeIconSolid },
  'location': { outline: MapPinIcon },
  'map': { outline: MapIcon },
  'menu': { outline: Bars3Icon },
  'clock': { outline: ClockIcon },
  'calendar': { outline: CalendarIcon },
  'bell': { outline: BellIcon },
  'mail': { outline: EnvelopeIcon },
  'plus': { outline: PlusIcon },
  'minus': { outline: MinusIcon },
  'search': { outline: MagnifyingGlassIcon },
  'settings': { outline: CogIcon },
  'user': { outline: UserIcon },
  'star': { outline: StarIcon, solid: StarIconSolid }
}

const sizeClass = computed(() => `icon--${props.size}`)

const iconComponent = computed(() => {
  const iconDef = iconMap[props.name]
  if (!iconDef) {
    console.warn(`Icon "${props.name}" not found. Available icons:`, availableIcons.value)
    return InformationCircleIcon
  }
  
  return (props.variant === 'solid' && iconDef.solid) 
    ? iconDef.solid 
    : iconDef.outline
})

const availableIcons = computed(() => Object.keys(iconMap))

defineExpose({
  availableIcons
})
</script>
