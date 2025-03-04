import React from "react";
import Link from "@docusaurus/Link";
import { SdkLogos } from "./SdkLogos";
import { BookOpen, Code, Terminal, Rocket, Cloud, ShieldCheck, Activity, MessageSquare, Globe, Calendar } from 'lucide-react';


const cardIcons = {
  "Get started with Temporal": <Rocket className="w-12 h-12 mb-4 text-[#7B61FF] dark:text-[#A78BFA]" strokeWidth="2" />,
  "Start building your next app": <Code className="w-12 h-12 mb-4 text-[#6366F1] dark:text-[#818CF8]" strokeWidth="2" />,
  "Security": <ShieldCheck className="w-12 h-12 mb-4 text-[#E11D48] dark:text-[#F43F5E]" strokeWidth="2" />,
  "Deploy your application to production": <Terminal className="w-12 h-12 mb-4 text-[#10B981] dark:text-[#6EE7B7]" strokeWidth="2" />,
  "Monitoring & Observability": <Activity className="w-12 h-12 mb-4 text-[#F59E0B] dark:text-[#FBBF24]" strokeWidth="2" />,
  "Try Temporal Cloud": <Cloud className="w-12 h-12 mb-4 text-[#F97316] dark:text-[#FDBA74]" strokeWidth="2" />,
};

const SimpleCard = ({ title, content, links = [] }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
      {cardIcons[title]}
      <h1 className="text-lg md:text-2xl font-bold text-center">{title}</h1>
      <p className="text-base text-center">{content}</p>
      <ul className="single-column-list">
        {links.map((link, i) => (
          <li key={i}>
            <Link to={link.path} className="hover:underline font-normal">{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CourseCTA = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center my-16">
      <BookOpen className="w-12 h-12 text-blue-500 dark:text-blue-300 mb-4 mx-auto" />
      <h1 className="text-2xl font-bold">Take a Temporal Course</h1>
      <p className="text-lg mt-2">Learn Temporal by enrolling in our free introductory courses.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Link to="https://learn.temporal.io/courses/temporal_101/">
          <img src="/homepage/background-101-courses.png" alt="Temporal 101 Course" className="rounded-lg shadow-lg w-full max-w-xs mx-auto" />
        </Link>
        <Link to="https://learn.temporal.io/courses/temporal_102/">
          <img src="/homepage/background-102-courses.png" alt="Temporal 102 Course" className="rounded-lg shadow-lg w-full max-w-xs mx-auto" />
        </Link>
      </div>
    </div>
  );
};

const CommunityCTA = () => {
  return (
    <div className="my-20 text-center">
      <h1 className="text-2xl font-bold">Join our Community</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <MessageSquare className="w-12 h-12 mb-4 text-[#6366F1] dark:text-[#818CF8]" strokeWidth="2" />
          <Link to="https://temporal.io/slack" className="hover:underline font-normal">Join us in Slack and say hi!</Link>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Globe className="w-12 h-12 mb-4 text-[#10B981] dark:text-[#6EE7B7]" strokeWidth="2" />
          <Link to="https://community.temporal.io/" className="hover:underline font-normal">Got a Question? Check out the forum</Link>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <Calendar className="w-12 h-12 mb-4 text-[#F97316] dark:text-[#FDBA74]" strokeWidth="2" />
          <Link to="https://temporal.io/community" className="hover:underline font-normal">Find an upcoming event near you</Link>
        </div>
      </div>
    </div>
  );
};

export const Intro = () => {
  return (
    <section className="mt-1 mb-14 tailwindcss temporal-documentation-landing">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimpleCard title="Get started with Temporal" content="New to Temporal? Follow our introductory tutorials and courses." links={[]} />
        <SimpleCard title="Start building your next app" content="Jump into the developer guides to start building your next backend application with Temporal." links={[]} />
        <SimpleCard title="Deploy your application to production" content="Choose a production deployment environment that suits your needs." links={[]} />
        <SimpleCard title="Try Temporal Cloud" content="Run your workflows on fully managed infrastructure. Focus on building, and let Temporal Cloud handle the rest." links={[]} />
        <SimpleCard title="Monitoring & Observability" content="Track workflow execution and performance with monitoring tools." links={[]} />
        <SimpleCard title="Security" content="Learn how to secure your Temporal applications." links={[]} />
      </div>
      <CourseCTA />
      <CommunityCTA />
    </section>
  );
};
