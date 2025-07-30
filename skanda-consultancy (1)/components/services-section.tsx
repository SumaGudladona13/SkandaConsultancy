
"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Laptop, BarChart3, Shield, ArrowRight } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Real Estate",
    description: "We help you buy, sell, or rent properties with expert guidance and market insights.",
    icon: TrendingUp,
    features: [
      "Property buying & selling assistance",
      "Rental management",
      "Legal and documentation support",
      "Market analysis & investment advice"
    ],
    badge: "Popular",
    badgeColor: "bg-green-500",
  },
  {
    id: 2,
    title: "Training",
    description: "Professional and corporate training programs to upskill your team or yourself.",
    icon: Users,
    features: [
      "Soft skills & leadership workshops",
      "Technical and IT training",
      "Customized corporate programs",
      "Certification support"
    ],
    badge: "Recommended",
    badgeColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Event Management",
    description: "End-to-end event planning and execution for corporate and personal occasions.",
    icon: BarChart3,
    features: [
      "Corporate events & conferences",
      "Weddings & private parties",
      "Venue selection & logistics",
      "On-site coordination"
    ],
    badge: "",
    badgeColor: "",
  },
]

export default function ServicesSection() {
  const router = useRouter()
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Consultancy Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of professional consultancy services designed to accelerate your business
            growth and success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1"
              >
                <CardHeader className="relative">
                  {service.badge && (
                    <Badge className={`absolute -top-2 -right-2 ${service.badgeColor} text-white`}>
                      {service.badge}
                    </Badge>
                  )}
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">


                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900">Key Features:</div>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors"
                    type="button"
                    onClick={() => router.push("/services")}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
