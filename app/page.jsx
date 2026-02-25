"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Code2,
  Brain,
  Rocket,
  Shield,
  Terminal,
  Briefcase,
  Upload,
  FileText,
  X
} from "lucide-react";

const ROLES = [
  { id: "frontend-developer", label: "Frontend Developer", icon: Code2, gradient: "from-cyan-500 to-blue-500" },
  { id: "backend-developer", label: "Backend Developer", icon: Terminal, gradient: "from-green-500 to-emerald-500" },
  { id: "full-stack-developer", label: "Full Stack Developer", icon: Rocket, gradient: "from-purple-500 to-pink-500" },
  { id: "data-scientist", label: "Data Scientist", icon: Brain, gradient: "from-orange-500 to-red-500" },
  { id: "machine-learning-engineer", label: "ML Engineer", icon: Sparkles, gradient: "from-violet-500 to-purple-500" },
  { id: "devops-engineer", label: "DevOps Engineer", icon: Shield, gradient: "from-blue-500 to-cyan-500" },
  { id: "cybersecurity-analyst", label: "Cybersecurity Analyst", icon: Shield, gradient: "from-red-500 to-orange-500" },
  { id: "product-manager", label: "Product Manager", icon: Target, gradient: "from-pink-500 to-rose-500" },
  { id: "system-design", label: "System Design", icon: Zap, gradient: "from-yellow-500 to-orange-500" },
];

const DIFFICULTIES = [
  { 
    id: "easy", 
    label: "Easy", 
    description: "Entry-level questions", 
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/50"
  },
  { 
    id: "medium", 
    label: "Medium", 
    description: "Mid-level questions", 
    color: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/50"
  },
  { 
    id: "hard", 
    label: "Hard", 
    description: "Senior-level questions", 
    color: "from-red-500 to-pink-500",
    glow: "shadow-red-500/50"
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "Role-Specific Questions",
    description: "Curated questions across multiple technical domains",
    color: "cyan"
  },
  {
    icon: TrendingUp,
    title: "Adaptive Difficulty",
    description: "Three progressive levels matching your expertise",
    color: "purple"
  },
  {
    icon: Sparkles,
    title: "Instant Feedback",
    description: "Smart keyword-based evaluation in <50ms with actionable insights",
    color: "pink"
  },
  {
    icon: Zap,
    title: "Zero Dependencies",
    description: "Privacy-first, no external APIs, your data stays yours",
    color: "green"
  },
];

const STATS = [
  { value: "∞", label: "Practice", suffix: "" },
  { value: "<50", label: "Eval Time", suffix: "ms" },
  { value: "100%", label: "Privacy", suffix: "" },
];

export default function HomePage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [uploadedResume, setUploadedResume] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedResume(file);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleRemoveResume = () => {
    setUploadedResume(null);
  };

  const handleStart = () => {
    if (!selectedRole || !selectedDifficulty || !selectedExperience) return;
    setShowDialog(false);
    router.push(`/interview?role=${selectedRole}&difficulty=${selectedDifficulty}&experience=${selectedExperience}`);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Mouse Follower Glow */}
        <motion.div
          className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scaleProgress }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 lg:py-32 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                <span className="block">Dominate</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Technical Interviews
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
              >
                Practice with <span className="text-cyan-400 font-semibold">adaptive</span> questions across multiple tech domains.
                Get <span className="text-purple-400 font-semibold">instant feedback</span>.
                Land your dream job.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    onClick={() => setShowDialog(true)}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-2xl shadow-cyan-500/50 border-0 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Launch Practice Session
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-7 text-lg rounded-xl border-2 border-gray-700 hover:border-cyan-500/50 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm text-white"
                  >
                    Explore Features
                  </Button>
                </motion.div>
              </motion.div>

              {/* Animated Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12"
              >
                {STATS.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 group-hover:border-cyan-500/50 transition-all">
                      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-sm text-gray-400 mt-2 font-mono">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Engineered for Excellence
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built with cutting-edge technology to deliver unmatched interview preparation experience
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, index) => {
                const IconComponent = feature.icon;
                const delay = index * 0.1;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group h-full"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                      <Card className="relative h-full bg-gray-900/80 backdrop-blur-sm border border-gray-800 group-hover:border-gray-700 p-6 rounded-2xl transition-all">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`w-7 h-7 text-${feature.color}-400`} />
                        </div>
                        <h3 className="font-bold text-lg mb-3 text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-32 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Three Steps to Mastery
                </span>
              </h2>
              <p className="text-xl text-gray-400">
                No signup. No credit card. Just pure learning.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-8 relative">
              {/* Connection Lines */}
              <div className="hidden sm:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              
              {[
                { 
                  step: "01", 
                  title: "Select Your Path", 
                  desc: "Choose your technical domain and set your difficulty level",
                  icon: Target,
                  color: "cyan"
                },
                { 
                  step: "02", 
                  title: "Practice & Learn", 
                  desc: "Answer 3 carefully curated questions at your own pace",
                  icon: Brain,
                  color: "purple"
                },
                { 
                  step: "03", 
                  title: "Level Up", 
                  desc: "Get instant detailed feedback with actionable insights",
                  icon: Rocket,
                  color: "pink"
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                const delay = index * 0.2;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                      <Card className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 group-hover:border-gray-700 p-8 rounded-2xl text-center">
                        <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center mb-6 shadow-2xl shadow-${item.color}-500/50 relative z-10`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-sm font-mono text-gray-500 mb-2">STEP {item.step}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => setShowDialog(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-7 text-lg font-bold rounded-xl shadow-2xl shadow-purple-500/50"
                >
                  Begin Your Journey
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container mx-auto px-6 py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            <Card className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-12 rounded-3xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Ready to Ace Your Next Interview?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of developers who've mastered their technical interviews with our platform
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => setShowDialog(true)}
                  className="bg-white text-black hover:bg-gray-200 px-10 py-7 text-lg font-bold rounded-xl shadow-2xl"
                >
                  Start Practicing For Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </Card>
          </motion.div>
        </section>
      </div>

      {/* Selection Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Choose Your Interview Path
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base">
              Select a role, experience level, and difficulty to begin your personalized practice session
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 py-6">
            {/* Role Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                <Code2 className="w-4 h-4 mr-2" />
                Select Role
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROLES.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <motion.div
                      key={role.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        onClick={() => setSelectedRole(role.id)}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedRole === role.id
                            ? "bg-gray-800 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                            : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.gradient} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white flex-1">{role.label}</span>
                          {selectedRole === role.id && (
                            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Experience Level Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Select Experience Level
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "junior", label: "Junior", years: "0-2 years", icon: "👶" },
                  { id: "mid", label: "Mid-Level", years: "2-5 years", icon: "💼" },
                  { id: "senior", label: "Senior", years: "5-8 years", icon: "🎯" },
                  { id: "lead", label: "Lead/Staff", years: "8+ years", icon: "👑" },
                ].map((exp) => (
                  <motion.div
                    key={exp.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={() => setSelectedExperience(exp.id)}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedExperience === exp.id
                          ? "bg-gray-800 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                          : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{exp.icon}</span>
                          {selectedExperience === exp.id && (
                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{exp.label}</p>
                          <p className="text-xs text-gray-500">{exp.years}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Select Difficulty
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DIFFICULTIES.map((diff) => (
                  <motion.div
                    key={diff.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`p-6 cursor-pointer transition-all ${
                        selectedDifficulty === diff.id
                          ? "bg-gray-800 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                          : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className={`bg-gradient-to-r ${diff.color} px-3 py-1 text-white font-semibold border-0`}>
                            {diff.label}
                          </Badge>
                          {selectedDifficulty === diff.id && (
                            <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          {diff.description}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume Upload (Optional) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume <span className="text-xs font-normal text-gray-600 ml-2">(Optional)</span>
              </h3>
              <Card className="p-6 bg-gray-900/50 border-gray-800 border-dashed">
                {!uploadedResume ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <FileText className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                          Click to upload your resume
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF format only, max 5MB
                        </p>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{uploadedResume.name}</p>
                        <p className="text-xs text-gray-500">
                          {(uploadedResume.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveResume}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <motion.div
                whileHover={{ scale: !selectedRole || !selectedDifficulty || !selectedExperience ? 1 : 1.02 }}
                whileTap={{ scale: !selectedRole || !selectedDifficulty || !selectedExperience ? 1 : 0.98 }}
              >
                <Button
                  onClick={handleStart}
                  disabled={!selectedRole || !selectedDifficulty || !selectedExperience}
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-7 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-cyan-500/50 disabled:shadow-none border-0"
                >
                  {!selectedRole || !selectedDifficulty || !selectedExperience ? (
                    "Select All Required Fields to Continue"
                  ) : (
                    <>
                      Start Interview
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
