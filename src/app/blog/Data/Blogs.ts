export interface IBlog {
  title: string
  date: string
  description: string
  link: string
}

export const BlogData: IBlog[] = [
  {
    title:
      'Using the Builder Pattern to create API calls with a RequestBuilder in TypeScript',
    date: 'Jan 9, 2026',
    description:
      'A pragmatic approach to standardize HTTP calls in modern apps (React/Next.js/BFF), separating request construction (RequestBuilder) from execution (Axios, retry, token refresh) to improve readability and scalability.',
    link: '/blog/builder-requestbuilder-typescript',
  },
  {
    title:
      'How to Deploy Applications Using CI/CD with CircleCI on AWS and Vercel',
    date: 'May 10, 2025',
    description:
      'Learn how to set up a CI/CD pipeline using AWS and Vercel for seamless deployment of your applications. This guide covers the essential steps and best practices for automating your deployment process.',
    link: '/blog/deploy-using-ci-cd-tools-aws-vercel',
  },
  {
    title:
      'How to use Grafana, Prometheus and Loki in Django for a better debug in your applications using Docker Compose',
    date: 'Nov 12, 2024',
    description:
      'Learn how to integrate Grafana, Prometheus, and Loki into Django projects to improve application monitoring and debugging. This practical guide shows you how to configure these popular tools in a Docker Compose environment.',
    link: '/blog/grafana-prometheus-loki-django-docker',
  },
]
