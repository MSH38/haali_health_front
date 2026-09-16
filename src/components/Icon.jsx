import {
  Activity,
  Clock,
  Code2,
  Heart,
  KeyRound,
  Landmark,
  LineChart,
  Lock,
  Mic,
  Plug,
  RefreshCw,
  Server,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

/** Maps the icon keys used in the translation files to lucide components. */
const ICONS = {
  activity: Activity,
  clock: Clock,
  code: Code2,
  heart: Heart,
  'key-round': KeyRound,
  landmark: Landmark,
  'line-chart': LineChart,
  lock: Lock,
  mic: Mic,
  plug: Plug,
  'refresh-cw': RefreshCw,
  server: Server,
  'shield-check': ShieldCheck,
  'trending-up': TrendingUp,
}

export default function Icon({ name, ...props }) {
  const Cmp = ICONS[name] ?? Activity
  return <Cmp aria-hidden="true" {...props} />
}
