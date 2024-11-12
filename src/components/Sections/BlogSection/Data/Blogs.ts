export interface IBlog {
  title: string
  date: string
  description: string
  link: string
}

export const BlogData: IBlog[] = [
  {
    title:
      'How to use Grafana, Prometheus and Loki in Django for a better debug in your applications using Docker Compose',
    date: 'Nov 12, 2024',
    description:
      'Learn how to integrate Grafana, Prometheus, and Loki into Django projects to improve application monitoring and debugging. This practical guide shows you how to configure these popular tools in a Docker Compose environment.',
    link: '#',
  },
]
