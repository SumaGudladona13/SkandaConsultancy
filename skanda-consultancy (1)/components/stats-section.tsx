import { TrendingUp, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "500+",
    label: "Happy Clients",
    description: "Businesses transformed",
  },
  {
    icon: Award,
    number: "98%",
    label: "Success Rate",
    description: "Project completion",
  },
  {
    icon: TrendingUp,
    number: "₹50Cr+",
    label: "Revenue Generated",
    description: "For our clients",
  },
  {
    icon: Clock,
    number: "15+",
    label: "Years Experience",
    description: "Industry expertise",
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl font-semibold mb-1">{stat.label}</div>
                <div className="text-blue-100 text-sm">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
