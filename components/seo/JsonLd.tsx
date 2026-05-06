import Script from 'next/script'

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  )
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jobhulp.be'

// Organization Schema
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Jobhulp',
    url: siteUrl,
    logo: `${siteUrl}/images/logo/logo-white.png`,
    description: 'Jobhulp matcht kandidaten en werkgevers op basis van vaardigheden, persoonlijkheid en voorkeuren.',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Jobhulp Team',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BE',
    },
    sameAs: [
      'https://www.linkedin.com/company/jobhulp',
      'https://twitter.com/jobhulp',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Dutch', 'English'],
    },
  }

  return <JsonLd data={data} />
}

// WebSite Schema with SearchAction
export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Jobhulp',
    url: siteUrl,
    description: 'Slimme matching tussen kandidaten en werkgevers op basis van vaardigheden en persoonlijkheid.',
    publisher: {
      '@type': 'Organization',
      name: 'Jobhulp',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/jobs/job-lists?keywords={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'nl-BE',
  }

  return <JsonLd data={data} />
}

// FAQ Schema
interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <JsonLd data={data} />
}

// HowTo Schema
interface HowToStep {
  name: string
  text: string
  image?: string
}

export function HowToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: HowToStep[]
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  }

  return <JsonLd data={data} />
}

// JobPosting Schema
interface JobPostingData {
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType: string
  hiringOrganization: {
    name: string
    logo?: string
  }
  jobLocation: {
    city: string
    region?: string
    country: string
  }
  baseSalary?: {
    minValue: number
    maxValue: number
    currency: string
  }
}

export function JobPostingSchema({ job }: { job: JobPostingData }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    ...(job.validThrough && { validThrough: job.validThrough }),
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: job.hiringOrganization.name,
      ...(job.hiringOrganization.logo && { logo: job.hiringOrganization.logo }),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.jobLocation.city,
        ...(job.jobLocation.region && { addressRegion: job.jobLocation.region }),
        addressCountry: job.jobLocation.country,
      },
    },
    ...(job.baseSalary && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.baseSalary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.baseSalary.minValue,
          maxValue: job.baseSalary.maxValue,
          unitText: 'YEAR',
        },
      },
    }),
  }

  return <JsonLd data={data} />
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }

  return <JsonLd data={data} />
}

// LocalBusiness Schema for Belgium focus
export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: 'Jobhulp',
    description: 'Online job matching platform voor België. Matcht kandidaten en werkgevers op vaardigheden en persoonlijkheid.',
    url: siteUrl,
    areaServed: {
      '@type': 'Country',
      name: 'Belgium',
    },
    serviceType: 'Job Matching Platform',
    priceRange: 'Gratis voor kandidaten',
  }

  return <JsonLd data={data} />
}

// Aggregate Offer for job listings
export function AggregateJobsSchema({ 
  jobCount, 
  lowSalary, 
  highSalary 
}: { 
  jobCount: number
  lowSalary?: number
  highSalary?: number
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vacatures op Jobhulp',
    description: `${jobCount} actuele vacatures in België`,
    numberOfItems: jobCount,
    itemListElement: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Vacatures in België',
        description: 'Vind je perfecte match op basis van vaardigheden en persoonlijkheid',
      },
    },
  }

  return <JsonLd data={data} />
}
