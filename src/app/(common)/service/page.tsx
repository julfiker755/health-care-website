import {
  Stethoscope,
  Pill,
  Activity,
  Microscope,
  Clipboard,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/reusable";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Breadcrumb>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          {" "}
          Comprehensive Healthcare Service
        </h1>
        <p className="text-sm text-gray-600 max-w-sm mx-auto">
          We offer a wide range of medical services to meet all your healthcare
          needs under one roof
        </p>
      </Breadcrumb>
      {/* Services List */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform"
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                  Learn more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 my-10 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need to schedule an appointment?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team of healthcare professionals is ready to provide you with
            the best care possible
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/doctors"
              className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Find a Doctor
            </Link>
            <div className="bg-transparent cursor-pointer border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Contact Us
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Service data
const services = [
  {
    id: "primary-care",
    title: "Primary Care",
    description:
      "Comprehensive healthcare services for patients of all ages, focusing on preventive care and managing chronic conditions.",
    icon: Stethoscope,
  },
  {
    id: "specialized-treatments",
    title: "Specialized Treatments",
    description:
      "Advanced medical treatments for complex conditions delivered by specialists with years of experience.",
    icon: Pill,
  },
  {
    id: "emergency-care",
    title: "Emergency Care",
    description:
      "24/7 emergency medical services with rapid response times and state-of-the-art equipment.",
    icon: Activity,
  },
  {
    id: "laboratory-services",
    title: "Laboratory Services",
    description:
      "Comprehensive diagnostic testing with quick and accurate results using the latest technology.",
    icon: Microscope,
  },
  {
    id: "preventive-care",
    title: "Preventive Care",
    description:
      "Proactive health screenings and wellness programs designed to prevent illness and promote long-term health.",
    icon: Clipboard,
  },
  {
    id: "cardiology",
    title: "Cardiology",
    description:
      "Comprehensive heart care including diagnostics, treatment, and rehabilitation for all types of heart conditions.",
    icon: Heart,
  },
];
