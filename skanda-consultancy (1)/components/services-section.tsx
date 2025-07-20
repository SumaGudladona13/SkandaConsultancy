import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Users, Laptop, BarChart3, Shield, ArrowRight } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Business Strategy Consulting",
    description: "Comprehensive business strategy development and implementation guidance for sustainable growth.",
    price: "₹50,000",
    duration: "3-6 months",
    icon: TrendingUp,
    features: ["Market Analysis", "Growth Strategy", "Competitive Analysis", "Implementation Plan"],
    badge: "Popular",
    badgeColor: "bg-green-500",
  },
  {
    id: 2,
    title: "Financial Advisory Services",
    description: "Expert financial planning, investment advice, and risk management solutions.",
    price: "₹35,000",
    duration: "2-4 months",
    icon: DollarSign,
    features: ["Financial Planning", "Investment Strategy", "Risk Assessment", "Tax Optimization"],
    badge: "Recommended",
    badgeColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "HR & Talent Management",
    description: "Complete HR solutions including recruitment, training, and performance management.",
    price: "₹40,000",
    duration: "1-3 months",
    icon: Users,
    features: ["Recruitment", "Training Programs", "Performance Management", "Policy Development"],
    badge: "",
    badgeColor: "",
  },
  {
    id: 4,
    title: "IT Solutions & Digital Transformation",
    description: "Modern IT infrastructure setup and digital transformation consulting.",
    price: "₹75,000",
    duration: "4-8 months",
    icon: Laptop,
    features: ["System Integration", "Cloud Migration", "Digital Strategy", "Tech Implementation"],
    badge: "Premium",
    badgeColor: "bg-purple-500",
  },
  {
    id: 5,
    title: "Marketing & Brand Strategy",
    description: "Comprehensive marketing strategies and brand development for market leadership.",
    price: "₹45,000",
    duration: "2-5 months",
    icon: BarChart3,
    features: ["Brand Strategy", "Digital Marketing", "Content Strategy", "Campaign Management"],
    badge: "",
    badgeColor: "",
  },
  {
    id: 6,
    title: "Risk Management & Compliance",
    description: "Enterprise risk assessment and compliance management solutions.",
    price: "₹60,000",
    duration: "3-6 months",
    icon: Shield,
    features: ["Risk Assessment", "Compliance Audit", "Policy Framework", "Monitoring Systems"],
    badge: "Enterprise",
    badgeColor: "bg-orange-500",
  },
]

export default function ServicesSection() {
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
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  </div>

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

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors">
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
