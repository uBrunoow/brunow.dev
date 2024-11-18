import Link from 'next/link'
import React from 'react'

const BlogGrafanaPrometheusLokiDjangoDockerPage = () => {
  return (
    <section className="container space-y-5 py-[150px]">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          How to use Grafana, Prometheus and Loki in Django for a better debug
          in your applications using Docker Compose
        </h1>
        <p className="text-zinc-500">Nov 12, 2024</p>
      </div>

      <div>
        With the growing need to monitor and maintain application performance,
        tools like Grafana, Prometheus, and Loki have become essential for
        developers. These tools enable the collection, analysis, and
        visualization of metrics, as well as real-time log management.
      </div>

      <div>
        In this article, we will explore how to integrate these tools with the
        Django framework, leveraging the power of Docker Compose to orchestrate
        the services. The goal is to create a complete environment where you
        can:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Monitor performance metrics with Prometheus.</li>
        <li>Analyze structured logs with Loki.</li>
        <li>Visualize data on dynamic dashboards in Grafana.</li>
      </ul>

      <div>
        This integration will not only help with maintaining your application
        but also serve as a practical introduction to observability tools within
        the Django ecosystem. Let&apos;s get started!
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          1. Install <span className="font-bold">django-prometheus</span> in
          your application
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Requirements</h1>
      </div>

      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Django &gt; 3.2</li>
        <li>Python 3.7 and above.</li>
      </ul>

      <div>
        <h1 className="text-lg font-semibold">Installation</h1>
      </div>

      <div>Install with:</div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Terminal
        </div>
        <pre className="p-3 text-sm">
          <code className="language-bash">
            {`pip install django-prometheus`}
          </code>
        </pre>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Quickstart</h1>
      </div>

      <div>In your settings.py:</div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./settings.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`INSTALLED_APPS = [`}</code>
          <code className="language-python">{`   ...`}</code>
          <code className="language-python">{`   'django_prometheus',`}</code>
          <code className="language-python">{`   ...`}</code>
          <code className="language-python">{`]`}</code>
          <code className="language-python">{` `}</code>
          <code className="language-python">{`MIDDLEWARE = [`}</code>
          <code className="language-python">{`    'django_prometheus.middleware.PrometheusBeforeMiddleware',`}</code>
          <code className="language-python">{`    # All your other middlewares go here, including the default`}</code>
          <code className="language-python">{`    # middlewares like SessionMiddleware, CommonMiddleware,`}</code>
          <code className="language-python">{`    # CsrfViewmiddleware, SecurityMiddleware, etc.`}</code>
          <code className="language-python">{`    'django_prometheus.middleware.PrometheusAfterMiddleware',`}</code>
          <code className="language-python">{`]`}</code>
        </pre>
      </div>

      <div>In your urls.py:</div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./urls.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`urlpatterns = [`}</code>
          <code className="language-python">{`   ...`}</code>
          <code className="language-python">{`    path('', include('django_prometheus.urls')),`}</code>
          <code className="language-python">{`]`}</code>
        </pre>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Monitoring your databases</h1>
      </div>

      <div>
        SQLite, MySQL, and PostgreSQL databases can be monitored. Just replace
        the{' '}
        <span className="text-base font-semibold text-zinc-600">ENGINE</span>{' '}
        property of your database, replacing{' '}
        <span className="text-base font-semibold text-zinc-600">
          django.db.backends
        </span>{' '}
        with{' '}
        <span className="text-base font-semibold text-zinc-600">
          django_prometheus.db.backends
        </span>
        .
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./settings.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`DATABASES = {`}</code>
          <code className="language-python">{`    'default': {`}</code>
          <code className="language-python">{`        'ENGINE': 'django_prometheus.db.backends.sqlite3',`}</code>
          <code className="language-python">{`        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),`}</code>
          <code className="language-python">{`    },`}</code>
          <code className="language-python">{`}`}</code>
        </pre>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Monitoring your caches</h1>
      </div>

      <div>
        Filebased, memcached, redis caches can be monitored. Just replace the
        cache backend to use the one provided by django_prometheus
        <span className="text-base font-semibold text-zinc-600">
          django.core.cache.backends
        </span>{' '}
        with{' '}
        <span className="text-base font-semibold text-zinc-600">
          django_prometheus.cache.backends
        </span>
        .
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./settings.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`CACHES = {`}</code>
          <code className="language-python">{`    'default': {`}</code>
          <code className="language-python">{`        'BACKEND': 'django_prometheus.cache.backends.filebased.FileBasedCache',`}</code>
          <code className="language-python">{`        'LOCATION': '/var/tmp/django_cache',`}</code>
          <code className="language-python">{`    },`}</code>
          <code className="language-python">{`}`}</code>
        </pre>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Monitoring your models</h1>
      </div>

      <div>
        You may want to monitor the creation/deletion/update rate for your
        model. This can be done by adding a mixin to them. This is safe to do on
        existing models (it does not require a migration).
      </div>

      <div>If your model is:</div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./models.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`class Dog(models.Model):`}</code>
          <code className="language-python">{`    name = models.CharField(max_length=100, unique=True)`}</code>
          <code className="language-python">{`    breed = models.CharField(max_length=100, blank=True, null=True)`}</code>
          <code className="language-python">{`    age = models.PositiveIntegerField(blank=True, null=True)`}</code>
        </pre>
      </div>

      <div>
        Just add the{' '}
        <span className="text-base font-semibold text-zinc-600">
          ExportModelOperationsMixin
        </span>{' '}
        as such:
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./models.py
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-python">{`from django_prometheus.models import ExportModelOperationsMixin`}</code>
          <code className="language-python">{` `}</code>
          <code className="language-python">{`class Dog(ExportModelOperationsMixin('dog'), models.Model):`}</code>
          <code className="language-python">{`    name = models.CharField(max_length=100, unique=True)`}</code>
          <code className="language-python">{`    breed = models.CharField(max_length=100, blank=True, null=True)`}</code>
          <code className="language-python">{`    age = models.PositiveIntegerField(blank=True, null=True)`}</code>
        </pre>
      </div>

      <div>
        <Link href={'https://pypi.org/project/django-prometheus/'}>
          Used as reference:{' '}
          <span className="font-semibold text-black transition-all hover:text-primary hover:underline">
            https://pypi.org/project/django-prometheus/
          </span>
        </Link>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          1. Setup up <span className="font-bold">docker-compose</span> in your
          application
        </h1>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Logging</h1>
      </div>

      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Grafana Loki</li>
        <li>Grafana Promtail</li>
      </ul>

      <div>
        <h1 className="text-lg font-semibold">Installation</h1>
      </div>

      <div>
        Loki is a log aggregation and indexing system, developed by Grafana
        Labs, optimized to function as a database for logs and the Promtail is
        the log collection agent that sends logs to Loki. It acts as a log
        shipper.
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./docker-compose-dev.yml
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-bash">{`  loki:`}</code>
          <code className="language-bash">{`    image: grafana/loki:2.9.2`}</code>
          <code className="language-bash">{`    ports:`}</code>
          <code className="language-bash">{`      - "3100:3100"`}</code>
          <code className="language-bash">{`    command: -config.file=/etc/loki/local-config.yaml`}</code>
          <code className="language-bash">{`    networks:`}</code>
          <code className="language-bash">{`      - loki`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`  promtail:`}</code>
          <code className="language-bash">{`    image: grafana/promtail:2.9.2`}</code>
          <code className="language-bash">{`    volumes:`}</code>
          <code className="language-bash">{`      - /var/log:/var/log`}</code>
          <code className="language-bash">{`      - /var/run/docker.sock:/var/run/docker.sock`}</code>
          <code className="language-bash">{`      - ./promtail/config/promtail-config.yml:/etc/promtail/config.yml`}</code>
          <code className="language-bash">{`    command: -config.file=/etc/promtail/config.yml`}</code>
          <code className="language-bash">{`    networks:`}</code>
          <code className="language-bash">{`      - loki`}</code>
        </pre>
      </div>

      <div>
        In the Promtail job we can see that we are mounting the{' '}
        <span className="text-base font-semibold text-zinc-600">
          ./promtail/config/promtail-config.yml
        </span>{' '}
        that is the file who will be responsible configurate Promtail and send
        the logs to Loki. So let&apos;s create this file.
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./promtail/config/promtail-config.yml
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-bash">{`server:`}</code>
          <code className="language-bash">{`  http_listen_port: 9080`}</code>
          <code className="language-bash">{`  grpc_listen_port: 0`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`positions:`}</code>
          <code className="language-bash">{`  filename: /tmp/positions.yaml`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`clients:`}</code>
          <code className="language-bash">{`  - url: http://loki:3100/loki/api/v1/push`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`scrape_configs:`}</code>
          <code className="language-bash">{`  - job_name: system`}</code>
          <code className="language-bash">{`    static_configs:`}</code>
          <code className="language-bash">{`      - targets:`}</code>
          <code className="language-bash">{`          - localhost`}</code>
          <code className="language-bash">{`        labels:`}</code>
          <code className="language-bash">{`          job: varlogs`}</code>
          <code className="language-bash">{`          __path__: /var/log/*log`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`  - job_name: docker`}</code>
          <code className="language-bash">{`    docker_sd_configs:`}</code>
          <code className="language-bash">{`      - host: unix:///var/run/docker.sock`}</code>
          <code className="language-bash">{`    relabel_configs:`}</code>
          <code className="language-bash">{`      - source_labels: [__meta_docker_container_name]`}</code>
          <code className="language-bash">{`        target_label: container`}</code>
          <code className="language-bash">{`      - source_labels:`}</code>
          <code className="language-bash">{`          [__meta_docker_container_label_com_docker_compose_service]`}</code>
          <code className="language-bash">{`        target_label: service`}</code>
          <code className="language-bash">{`      - source_labels:`}</code>
          <code className="language-bash">{`          [__meta_docker_container_label_com_docker_compose_project]`}</code>
          <code className="language-bash">{`        target_label: compose_project`}</code>
          <code className="language-bash">{`      - source_labels: [__meta_docker_container_label_com_docker_compose_oneoff]`}</code>
          <code className="language-bash">{`        target_label: compose_oneoff`}</code>
          <code className="language-bash">{`      - source_labels:`}</code>
          <code className="language-bash">{`          [__meta_docker_container_label_com_docker_compose_config_hash]`}</code>
          <code className="language-bash">{`        target_label: compose_config_hash`}</code>
          <code className="language-bash">{`      - source_labels:`}</code>
          <code className="language-bash">{`          [__meta_docker_container_label_com_docker_compose_version]`}</code>
          <code className="language-bash">{`        target_label: compose_version`}</code>
        </pre>
      </div>

      <div>
        <h1 className="text-lg font-semibold">Metrics and Dashboard</h1>
      </div>

      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Prometheus</li>
        <li>Grafana</li>
      </ul>

      <div>
        <h1 className="text-lg font-semibold">Installation</h1>
      </div>

      <div>
        Grafana is a tool for creating and visualizing dashboards based on data
        from various sources and Prometheus is a monitoring tool and alert
        system focused on numerical metrics based on time series.
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./docker-compose-dev.yml
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-bash">{`grafana:`}</code>
          <code className="language-bash">{`  environment:`}</code>
          <code className="language-bash">{`    - GF_PATHS_PROVISIONING=/etc/grafana/provisioning`}</code>
          <code className="language-bash">{`  entrypoint:`}</code>
          <code className="language-bash">{`    - sh`}</code>
          <code className="language-bash">{`    - -euc`}</code>
          <code className="language-bash">{`    - |`}</code>
          <code className="language-bash">{`      mkdir -p /etc/grafana/provisioning/datasources`}</code>
          <code className="language-bash">{`      cat <<EOF > /etc/grafana/provisioning/datasources/ds.yaml`}</code>
          <code className="language-bash">{`      apiVersion: 1`}</code>
          <code className="language-bash">{`      datasources:`}</code>
          <code className="language-bash">{`      - name: Loki`}</code>
          <code className="language-bash">{`        type: loki`}</code>
          <code className="language-bash">{`        access: proxy`}</code>
          <code className="language-bash">{`        orgId: 1`}</code>
          <code className="language-bash">{`        url: http://loki:3100`}</code>
          <code className="language-bash">{`        basicAuth: false`}</code>
          <code className="language-bash">{`        isDefault: true`}</code>
          <code className="language-bash">{`        version: 1`}</code>
          <code className="language-bash">{`        editable: false`}</code>
          <code className="language-bash">{`      - name: Prometheus`}</code>
          <code className="language-bash">{`        type: prometheus`}</code>
          <code className="language-bash">{`        access: proxy`}</code>
          <code className="language-bash">{`        orgId: 1`}</code>
          <code className="language-bash">{`        url: http://prometheus:9090`}</code>
          <code className="language-bash">{`        basicAuth: false`}</code>
          <code className="language-bash">{`        isDefault: false`}</code>
          <code className="language-bash">{`        version: 1`}</code>
          <code className="language-bash">{`        editable: false`}</code>
          <code className="language-bash">{`      EOF`}</code>
          <code className="language-bash">{`      /run.sh`}</code>
          <code className="language-bash">{`  image: grafana/grafana:latest`}</code>
          <code className="language-bash">{`  volumes:`}</code>
          <code className="language-bash">{`    - grafana_data:/var/lib/grafana`}</code>
          <code className="language-bash">{`  ports:`}</code>
          <code className="language-bash">{`    - "3060:3000"`}</code>
          <code className="language-bash">{`  networks:`}</code>
          <code className="language-bash">{`    - loki`}</code>
          <code className="language-bash">{` `}</code>
          <code className="language-bash">{`prometheus:`}</code>
          <code className="language-bash">{`  image: prom/prometheus:latest`}</code>
          <code className="language-bash">{`  ports:`}</code>
          <code className="language-bash">{`    - "9090:9090"`}</code>
          <code className="language-bash">{`  entrypoint:`}</code>
          <code className="language-bash">{`    - sh`}</code>
          <code className="language-bash">{`    - -c`}</code>
          <code className="language-bash">{`    - |`}</code>
          <code className="language-bash">{`      /bin/prometheus --config.file=/etc/prometheus/prometheus/config/prometheus.yml --web.enable-lifecycle`}</code>
          <code className="language-bash">{`  volumes:`}</code>
          <code className="language-bash">{`    - ./prometheus/config/prometheus.yml:/etc/prometheus/prometheus/config/prometheus.yml`}</code>
          <code className="language-bash">{`    - prometheus_data:/prometheus`}</code>
          <code className="language-bash">{`  networks:`}</code>
          <code className="language-bash">{`    - loki`}</code>
        </pre>
      </div>

      <div>
        In the Prometheus job we can see that we are mounting the{' '}
        <span className="text-base font-semibold text-zinc-600">
          ./prometheus/config/prometheus.yml
        </span>{' '}
        that is the file who will be responsible configurate Prometheus and get
        the metrics from Django application. So let&apos;s create this file.
      </div>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./prometheus/config/prometheus.yml
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-bash">{`global:`}</code>
          <code className="language-bash">{`  scrape_interval: 15s`}</code>
          <code className="language-bash">{`  scrape_timeout: 10s`}</code>
          <code className="language-bash">{`  scrape_protocols:`}</code>
          <code className="language-bash">{`    - OpenMetricsText1.0.0`}</code>
          <code className="language-bash">{`    - OpenMetricsText0.0.1`}</code>
          <code className="language-bash">{`    - PrometheusText0.0.4`}</code>
          <code className="language-bash">{`  evaluation_interval: 15s`}</code>
          <code className="language-bash">{`runtime:`}</code>
          <code className="language-bash">{`  gogc: 75`}</code>
          <code className="language-bash">{`scrape_configs:`}</code>
          <code className="language-bash">{`  - job_name: prometheus`}</code>
          <code className="language-bash">{`    honor_timestamps: true`}</code>
          <code className="language-bash">{`    track_timestamps_staleness: false`}</code>
          <code className="language-bash">{`    scrape_interval: 15s`}</code>
          <code className="language-bash">{`    scrape_timeout: 10s`}</code>
          <code className="language-bash">{`    scrape_protocols:`}</code>
          <code className="language-bash">{`      - OpenMetricsText1.0.0`}</code>
          <code className="language-bash">{`      - OpenMetricsText0.0.1`}</code>
          <code className="language-bash">{`      - PrometheusText0.0.4`}</code>
          <code className="language-bash">{`    metrics_path: /metrics`}</code>
          <code className="language-bash">{`    scheme: http`}</code>
          <code className="language-bash">{`    enable_compression: true`}</code>
          <code className="language-bash">{`    follow_redirects: true`}</code>
          <code className="language-bash">{`    enable_http2: true`}</code>
          <code className="language-bash">{`    static_configs:`}</code>
          <code className="language-bash">{`      - targets:`}</code>
          <code className="language-bash">{`          - <YOUR IP>:8000`}</code>
        </pre>{' '}
      </div>

      <div>
        <span className="font-semibold">Detail:</span> Replace{' '}
        <span className="italic">{'<YOUR IP>'}</span> with your IP address in
        dev ambient.
      </div>

      <div>
        <h1 className="text-lg font-semibold">Final touches</h1>
      </div>

      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Volumes</li>
        <li>Network</li>
      </ul>

      <div className="w-full overflow-scroll rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          ./docker-compose-dev.yml
        </div>
        <pre className="flex flex-col p-3 text-sm">
          <code className="language-yaml">{`networks:`}</code>
          <code className="language-yaml">{`  loki:`}</code>
          <code className="language-yaml">{` `}</code>
          <code className="language-yaml">{`volumes:`}</code>
          <code className="language-yaml">{`  grafana_data:`}</code>
          <code className="language-yaml">{`  prometheus_data:`}</code>
        </pre>{' '}
      </div>

      <div>
        <h1 className="text-xl font-semibold">Closing Thoughts</h1>
      </div>

      <div>
        Integrating Grafana, Prometheus, and Loki into a Django project using
        Docker Compose creates a powerful environment for monitoring, metric
        analysis, and log management. This setup provides a comprehensive view
        of your application&apos;s behavior, making it easier to identify issues
        and optimize performance.
      </div>

      <div>
        Throughout this article, we explored how each tool contributes to the
        observability ecosystem:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Prometheus collects essential metrics.</li>
        <li>Loki efficiently stores and organizes logs.</li>
        <li>
          Grafana unifies the data into interactive and dynamic dashboards.
        </li>
      </ul>

      <div>
        With this stack configured, you&apos;re ready to monitor your
        application professionally, anticipating issues and ensuring a more
        stable experience for your users. Now it&apos;s time to customize and
        expand this environment to fit your specific needs.
      </div>

      <div>
        If you found this guide helpful, feel free to share it and if you have
        any questions or comments just{' '}
        <Link
          className="font-semibold text-black hover:text-primary hover:underline"
          href={'mailto:brunowerner7@gmail.com'}
        >
          contact me
        </Link>
        . Your journey to mastering monitoring and observability has just begun!
        🚀
      </div>
    </section>
  )
}

export default BlogGrafanaPrometheusLokiDjangoDockerPage
