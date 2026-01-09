import Image from 'next/image'
import Link from 'next/link'
import CircleCiAddEnv from './images/circle-ci-add-env.png'
import CircleCiAddPipeline from './images/circle-ci-add-pipeline.png'
import CirlceCiAddSSHKey from './images/circle-ci-add-ssh-key.png'
import CircleCiAddingTrigger from './images/circle-ci-adding-trigger.png'
import CircleCiConfigs from './images/circle-ci-config.png'
import CircleCiEnv from './images/circle-ci-env.png'
import CirlceCiLogin from './images/circle-ci-login.png'
import CircleCiPieplines from './images/circle-ci-pipelines.png'
import CircleCiDashboard from './images/circle-ci-project.png'
import CirlceCiSSHKey from './images/circle-ci-ssh-key.png'
import CircleCiTriggers from './images/circle-ci-triggers.png'
import CirlceCiAddingAPipeline from './images/cirlce-ci-adding-pipeline.png'
import GithubToken from './images/github-token.png'
import VercelToken from './images/vercel-token.png'

const DeployUsingCiCdToolsAwsVercel = () => {
  return (
    <section className="container space-y-5 py-[150px]">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          How to Deploy Applications Using CI/CD with CircleCI on AWS and Vercel
        </h1>
        <p className="text-zinc-500">May 10, 2025</p>
      </div>
      <div>
        With the growing need for efficient and reliable software delivery,
        setting up an automated deployment pipeline has become a fundamental
        practice. In this article, we’ll integrate CircleCI to automate
        deployments to both Vercel and AWS EC2, so that every change pushed to
        your repository is automatically built and deployed with minimal manual
        intervention. You'll learn how to:
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Select and configure a pipeline tool</li>
        <li>Create and customize your own deployment pipeline</li>
        <li>
          Automatically trigger deployments upon commits to the main branch
        </li>
      </ul>
      <div>Let's get started!</div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">1. Cirlce CI</h1>

        <p>
          For this automation, we will use Circleci, a robust continuous
          integration tool and easily integrated with Github repositories.
        </p>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Requirements</h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Github Account</li>
        <li>A project ready to deploy</li>
        <li>CircleCI Account (to configure the pipeline)</li>
        <li>Vercel Account (for deployment to Vercel)</li>
        <li>AWS Account with EC2 instance (for deployment to AWS)</li>
        <li>SSH Key to authenticate with AWS EC2 (for SSH access)</li>
        <li>Basic knowledge of YAML (for CircleCI configuration)</li>
      </ul>
      <div>
        <h1 className="text-lg font-semibold">Connecting Github to Circleci</h1>
      </div>
      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>
            Visit{' '}
            <Link
              className="text-primary underline"
              href="https://circleci.com/"
            >
              Circle CI
            </Link>{' '}
            and log in with your Github account.
          </li>
        </ul>
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI log-in
        </div>
        <Image
          className="obejct-cover w-full"
          src={CirlceCiLogin}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        After logging in, you will be redirected to the CircleCI dashboard.
        There, you will need to create an 'Organization,' and once that's done,
        you can proceed to create a project. Follow the steps below to complete
        the process:
      </div>
      <div>
        <h1 className="text-lg font-semibold">Setting up a project</h1>
      </div>
      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>
            Click on the{' '}
            <span className="text-base font-semibold text-zinc-600">
              Set up a project
            </span>{' '}
            tab in the right top.
          </li>
        </ul>
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI Dashboard
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiDashboard}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        After clicking on the{' '}
        <span className="text-base font-semibold text-zinc-600">
          Set up a project
        </span>{' '}
        tab, you will be redirected to a page where you can select the
        repository you want to connect to CircleCI. Choose the desired
        repository and click on the{' '}
        <span className="text-base font-semibold text-zinc-600">
          Set Up Project
        </span>{' '}
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI configuration
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiConfigs}
          alt=""
          width={500}
          height={500}
        />
      </div>
      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>
            Select the option{' '}
            <span className="text-base font-semibold text-zinc-600">
              Faster: Commit a starter CI pipeline to a new branch
            </span>{' '}
            to create a new branch with the CircleCI configuration file.
          </li>
        </ul>
      </div>
      <div>
        After selecting the option, you will be redirected to a page where you
        can view the pipeline that has been created. This pipeline represents a
        basic configuration for building and deploying your application. You can
        customize it to suit your specific needs.
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI All pipelines
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiPieplines}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold">Creating your own pipeline</h1>
      </div>
      <div>
        To create your own pipeline, go to the project settings and navigate to
        the pipeline tab.
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI add new pipelines
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiAddPipeline}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>
            Click on the{' '}
            <span className="text-base font-semibold text-zinc-600">
              Add new pipeline
            </span>{' '}
            button to create a new pipeline. You can name it whatever you want.
          </li>
          <li>
            If your account is not connected to Github, you will need to
            authorize CircleCI to access your Github account. This is necessary
            for CircleCI to be able to access your repositories and perform
            deployments.
          </li>
          <li>Then select your repository.</li>
          <li>Select your config file path.</li>
          <li>And finally, save the pipeline.</li>
        </ul>
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI adding a pipeline
        </div>
        <Image
          className="obejct-cover w-full"
          src={CirlceCiAddingAPipeline}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold">Creating your trigger</h1>
      </div>
      <div>
        To create your trigger, go to the project settings and navigate to the
        triggers tab.
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI add new trigger
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiTriggers}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        Here you can select many types of triggers, but for this tutorial we
        will select the{' '}
        <span className="text-base font-semibold text-zinc-600">
          Github App
        </span>{' '}
        to create a trigger that will be executed when a pull request is created
        in to the main branch.
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI adding a Trigger
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiAddingTrigger}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>
            You can name your trigger whatever you want, but I recommend using a
            name that describes the purpose of the trigger.
          </li>
          <li>Then select your repository.</li>
          <li>Select your pipeline to run.</li>
          <li>
            Select when you want to run your pipeline, I recommend selecting the
            "Pushes to default branch" option.
          </li>
          <li>And finally, save the trigger.</li>
        </ul>
      </div>
      <div>
        <h1 className="text-lg font-semibold">
          Creating environment variables
        </h1>
      </div>

      <div>
        To create environment variables, go to the project settings and navigate
        to the environment variables tab.
      </div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI environment variables
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiEnv}
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div>
        Here you can create environment variables that will be used in your
        pipeline. You can create as many environment variables as you want.
      </div>

      <div>
        To add an environment variable, click on the{' '}
        <span className="text-base font-semibold text-zinc-600">
          Add Environment Variable
        </span>{' '}
        button and enter the name and value of the variable.
      </div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI add environment variables
        </div>
        <Image
          className="obejct-cover w-full"
          src={CircleCiAddEnv}
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div>
        <h1 className="text-lg font-semibold">Creating SSH keys</h1>
      </div>

      <div>
        To create SSH keys, go to the project settings and navigate to the SSH
        keys tab.
      </div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI SSH keys
        </div>
        <Image
          className="obejct-cover w-full"
          src={CirlceCiSSHKey}
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div>
        Here you can create SSH keys that will be used in your pipeline. You can
        create as many SSH keys as you want.
      </div>

      <div>
        To add an SSH key, click on the{' '}
        <span className="text-base font-semibold text-zinc-600">
          Add SSH Key
        </span>{' '}
        button and enter the name and value of the key.
      </div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Circle CI add SSH keys
        </div>
        <Image
          className="obejct-cover w-full"
          src={CirlceCiAddSSHKey}
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">2. Vercel</h1>

        <p>
          To deploy your application to Vercel, you will need to create a Vercel
          account and connect it to your Github account. Once you have done
          this, you can generate a token that will be used to authenticate your
          application with Vercel. Follow the steps below to complete the
          process:
        </p>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Requirements</h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Create a Vercel account</li>
        <li>Connect your Vercel account to your Github account</li>
        <li>Generate a Vercel token</li>
      </ul>
      <div>
        <h1 className="text-lg font-semibold">Generating a vercel token</h1>
      </div>
      <div>
        To generate a Vercel token, go to the Vercel dashboard and navigate to
        the account settings. There, you will find an option to generate a new
        token. Click on it and follow the instructions to create a new token.
        Once you have generated the token, copy it and save it in a secure
        place.
      </div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Vercel Account Settings
        </div>
        <Image
          className="obejct-cover w-full"
          src={VercelToken}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold">
          Creating environment variables in your Circle CI project
        </h1>
      </div>
      <div>
        Next, let's define the environment variables required to deploy to
        Vercel, we need to create some environment variables in our Circle CI
        project to be able to deploy our application to Vercel and AWS EC2.
      </div>
      <div>
        To this project, we will need to create the following environment
        variables:
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>VERCEL_PROJECT_NAME</li>
          <li>VERCEL_TOKEN</li>
        </ul>
      </div>
      <div>
        The VERCEL_PROJECT_NAME variable is the name of your project in Vercel.
        You can find it in the Vercel dashboard. The VERCEL_TOKEN variable is
        the token that you generated in the previous step. You can find it in
        the Vercel dashboard as well.
      </div>
      <div>
        <h1 className="text-lg font-semibold">Seting up your config file</h1>
      </div>
      <div>To set up your config file, you can use the following example:</div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          .cirlceci/config.yml
        </div>
        <pre className="p-3 text-sm overflow-auto">
          <code className="language-yaml">{`
version: 2.1
jobs:
  deploy-vercel:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm install --force
      - run:
          name: Install Vercel CLI
          command: npm install -g vercel
      - run:
          name: Link Vercel project
          command: vercel link --project $VERCEL_PROJECT_NAME --token $VERCEL_TOKEN --yes
      - run:
          name: Deploy to Vercel
          command: vercel --prod --token $VERCEL_TOKEN --yes --no-wait
      
    workflows: 
      build-and-deploy: 
        jobs: 
          - deploy-vercel
`}</code>
        </pre>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">3. AWS EC2</h1>

        <p>
          To deploy your application to AWS EC2, you will need to create an AWS
          account and launch an EC2 instance. Once you have done this, you can
          generate a key pair that will be used to authenticate your application
          with AWS. Follow the steps below to complete the process:
        </p>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Requirements</h1>
      </div>
      <ul className="ml-2 list-inside list-disc text-zinc-600">
        <li>Create an AWS account</li>
        <li>Launch an EC2 instance</li>
        <li>Generate a key pair</li>
      </ul>
      <div>
        <h1 className="text-lg font-semibold">
          Creating an SSH key in your Cirlce CI project
        </h1>
      </div>

      <div>
        As we could see in the previous steps, we need to create an SSH key in
        our Circle CI project to be able to deploy our application to AWS EC2.
      </div>

      <div>
        <h1 className="text-lg font-semibold">Creating an Github Token</h1>
      </div>

      <div>
        To create a Github token, go to the Github account settings and navigate
        to the developer settings. There, you will find an option to generate a
        new token. Click on it and follow the instructions to create a new
        token. Once you have generated the token, copy it and save it in a
        secure place because we are going to use it later on the project.
      </div>

      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          Github Token
        </div>
        <Image
          className="obejct-cover w-full"
          src={GithubToken}
          alt=""
          width={1000}
          height={1000}
        />
      </div>

      <div>
        <h1 className="text-lg font-semibold">
          Creating environment variables in your Circle CI project
        </h1>
      </div>

      <div>
        As we could see in the previous steps, we need to create some
        environment variables in our Circle CI project to be able to deploy our
        application to AWS EC2.
      </div>

      <div>
        To this project, we will need to create the following environment
        variables:
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>SSH_USER</li>
          <li>SSH_IP</li>
          <li>GITHUB_USER</li>
          <li>GITHUB_TOKEN</li>
        </ul>
      </div>

      <div>
        The SSH_USER variable is the user that you will use to connect to your
        EC2 instance. The SSH_IP variable is the IP address of your EC2
        instance. The GITHUB_USER variable is your Github username. The
        GITHUB_TOKEN variable is the token that you generated in the previous
        step. You can find it in the Github dashboard as well.
      </div>

      <div>
        <h1 className="text-lg font-semibold">Seting up your config file</h1>
      </div>

      <div>To set up your config file, you can use the following example:</div>
      <div className="w-full rounded-lg border bg-zinc-100/20">
        <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
          .cirlceci/config.yml
        </div>
        <pre className="p-3 text-sm overflow-auto">
          <code className="language-yaml">{`
version: 2.1

jobs:
  deploy:
    docker:
      - image: cimg/base:stable
    steps:
      - add_ssh_keys:
          fingerprints:
            - "SHA256...." # Replace with your SSH key fingerprint
      - run:
          name: Deploy to EC2 via SSH
          command: |
            ssh -o StrictHostKeyChecking=no $SSH_USER@$SSH_IP "
              cd flyup-api &&
              git remote set-url origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/....git && # Replace with your repository URL
              git pull &&
              sudo docker compose down &&
              sudo docker compose up -d --build
            "

workflows:
  deploy_workflow:
    jobs:
      - deploy
`}</code>
        </pre>
      </div>

      <div>
        <ul className="ml-2 list-inside list-disc text-zinc-600">
          <li>Replace your SSH key fingerprint</li>
          <li>Replace your repository URL</li>
        </ul>
      </div>

      <div>
        It's important to note that the code after you connect your Github
        Account in the following line:
        <div className="w-full rounded-lg border bg-zinc-100/20">
          <div className="border-b bg-zinc-100 px-3 py-1 text-sm font-semibold">
            .cirlceci/config.yml
          </div>
          <pre className="p-3 text-sm overflow-auto">
            <code className="language-yaml">
              {`
              git remote set-url origin https://$GITHUB_USER:$GITHUB_TOKEN@github.com/....git && # Replace with your repository URL
              git pull &&
                `}
            </code>
          </pre>
        </div>
        Is the code that will be executed in your EC2 instance. In this example,
        we are using docker compose to deploy our application. You can replace
        this code with the code that you use to deploy your application.
      </div>

      <div>
        <h1 className="text-xl font-semibold">Closing Thoughts</h1>
      </div>

      <div>
        Setting up a CI/CD pipeline using CircleCI to deploy on both Vercel and
        AWS EC2 may seem complex at first, but once the foundation is in place,
        it significantly enhances your development workflow.
      </div>

      <div>
        Automating deployments reduces human error, saves time, and ensures
        consistent delivery. Whether you're deploying a static site on Vercel or
        scaling applications with AWS EC2, this approach gives you flexibility
        and control.
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
        . Your journey to streamlining your development and deployment workflow
        has just begun! 🚀
      </div>
    </section>
  )
}

export default DeployUsingCiCdToolsAwsVercel
