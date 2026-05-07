import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence 
} from "motion/react";
import { 
  Zap, 
  ArrowUpRight, 
  Monitor, 
  Layers, 
  Cpu, 
  Globe, 
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Lock,
  Mail,
  Github,
  Play,
  FileText,
  Activity,
  Server,
  Cloud
} from "lucide-react";
import { useState, ReactNode, useRef, useEffect } from "react";

// --- Components ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md glass p-8 rounded-[2rem] z-[101] border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function FeatureCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2rem] glass border-white/5 space-y-6 hover:border-white/20 transition-all group"
    >
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-white/40 leading-relaxed font-light">{description}</p>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup' | 'docs' | null>(null);
  
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div ref={targetRef} className="relative min-h-screen bg-[#080808] font-sans selection:bg-blue-500/30 overflow-x-hidden text-white">
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
          className="absolute bottom-10 right-[-5%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="text-white fill-current" size={20} />
            </div>
            <span className="font-semibold text-xl tracking-tight uppercase">Stellar.</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {[
              { name: 'Analytics', id: 'analytics' },
              { name: 'Infrastructure', id: 'infrastructure' },
              { name: 'Enterprise', id: 'enterprise' },
              { name: 'Vision', id: 'vision' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setModalType('login')}
              className="px-6 h-10 text-sm font-medium hover:bg-white/5 rounded-full transition-colors"
            >
              Log in
            </button>
            <button 
              onClick={() => setModalType('signup')}
              className="px-6 h-10 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5"
            >
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-white/70"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/5 bg-[#0c0c0c] px-6 py-8 space-y-6"
            >
              {['Analytics', 'Infrastructure', 'Enterprise', 'Vision'].map((item) => (
                <button 
                  key={item} 
                  className="block w-full text-left text-lg font-medium text-white/70 hover:text-white"
                  onClick={() => scrollTo(item.toLowerCase())}
                >
                  {item}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <button 
                  onClick={() => setModalType('login')}
                  className="w-full h-12 glass rounded-xl font-medium"
                >
                  Log in
                </button>
                <button 
                  onClick={() => setModalType('signup')}
                  className="w-full h-12 bg-white text-black rounded-xl font-bold"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <Modal 
        isOpen={modalType === 'login'} 
        onClose={() => setModalType(null)} 
        title="Welcome Back"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full h-12 glass rounded-xl pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/30 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full h-12 glass rounded-xl pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <button className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
            Sign In
          </button>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0c0c0c] px-2 text-white/20">Or continue with</span></div>
          </div>
          <button className="w-full h-12 glass hover:bg-white/5 text-white font-medium rounded-xl flex items-center justify-center gap-2">
            <Github size={18} /> GitHub
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={modalType === 'signup'} 
        onClose={() => setModalType(null)} 
        title="Create Account"
      >
        <div className="space-y-6">
          <p className="text-white/50 text-sm">Join the network and start building high-performance applications today.</p>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full h-12 glass rounded-xl px-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
            <input type="email" placeholder="Email Address" className="w-full h-12 glass rounded-xl px-4 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
            <button className="w-full h-12 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all">
              Initialize Account
            </button>
          </div>
          <p className="text-[10px] text-white/20 text-center uppercase tracking-widest">
            By signing up, you agree to our Terms of Service.
          </p>
        </div>
      </Modal>

      <Modal 
        isOpen={modalType === 'docs'} 
        onClose={() => setModalType(null)} 
        title="Documentation Portal"
      >
        <div className="space-y-6">
          <div className="glass p-4 rounded-xl space-y-2">
            <div className="text-blue-400 font-bold text-xs uppercase tracking-widest">Quick Start</div>
            <p className="text-sm text-white/60">npx stellar-core init my-project</p>
          </div>
          <div className="space-y-3">
             {['Core API', 'Components', 'Theming', 'Security'].map(item => (
               <button key={item} className="w-full p-4 glass rounded-xl flex items-center justify-between hover:bg-white/5 transition-all text-sm">
                  {item} <ChevronRight size={14} className="text-white/20" />
               </button>
             ))}
          </div>
        </div>
      </Modal>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-10">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-semibold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Latest Release: v8.4.2
            </motion.div>
            
            <motion.div style={{ y: textY }} className="space-y-6">
              <motion.h1 
                variants={itemVariants}
                className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tighter gradient-text"
              >
                The Architecture <br /> of <span className="text-blue-500">Excellence.</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-xl text-white/50 max-w-lg leading-relaxed font-light"
              >
                Synthesizing engineering precision with artistic vision to define the next standard of digital experience.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setModalType('signup')}
                className="group px-8 h-16 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all active:scale-[0.98] shadow-2xl shadow-white/5"
              >
                Start Building Now
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
              </button>
              <button 
                onClick={() => setModalType('docs')}
                className="px-8 h-16 glass text-white font-semibold rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <FileText size={18} /> Documentation
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-10 pt-8 overflow-x-auto pb-4 scrollbar-hide">
              {[
                { label: 'Latency', val: '12ms' },
                { label: 'Nodes', val: '2.5k+' },
                { label: 'Uptime', val: '99.9%' }
              ].map((stat, i) => (
                <div key={i} className="space-y-1 shrink-0">
                  <div className="text-2xl font-bold tracking-tight">{stat.val}</div>
                  <div className="text-xs text-white/30 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            className="relative lg:block hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[150px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
              className="relative glass aspect-square rounded-[3.5rem] p-1 overflow-hidden backdrop-blur-3xl"
            >
              <div className="w-full h-full rounded-[3.3rem] bg-[#0c0c0c] border border-white/5 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full grid grid-cols-2 gap-4 p-10 relative">
                   {/* Interactive Card 1 */}
                   <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="glass rounded-2xl p-6 flex flex-col justify-between border-white/10"
                   >
                      <Cpu className="text-blue-500" size={24} />
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-bold text-white/30">CPU LOAD</span>
                          <span className="text-xs font-bold text-blue-400">42%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '42%' }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                   </motion.div>

                   {/* Interactive Card 2 */}
                   <motion.div 
                     whileHover={{ scale: 1.05 }}
                     className="bg-blue-600 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative"
                   >
                      <Globe className="text-white/30 absolute -top-4 -right-4" size={100} />
                      <div className="relative z-10 text-[10px] font-bold tracking-widest text-white/60">NET OPS</div>
                      <div className="relative z-10 text-xl font-bold tracking-tight">Active.</div>
                   </motion.div>

                   {/* Interactive Chart */}
                   <motion.div 
                     whileHover={{ scale: 1.02 }}
                     className="col-span-2 glass rounded-2xl p-8 border-white/10 flex flex-col justify-between"
                   >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="text-lg font-bold tracking-tight">Data Stream</div>
                          <div className="text-xs text-white/40">Throughput monitoring</div>
                        </div>
                        <Activity className="text-emerald-500" size={20} />
                      </div>
                      <div className="flex gap-1.5 items-end pt-8 h-24">
                        {[50, 80, 45, 90, 65, 85, 60, 45, 75, 55, 95, 70, 80, 65, 90].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: h + '%' }}
                            transition={{ 
                              height: { delay: 0.5 + (i * 0.05), duration: 0.8, ease: "easeOut" },
                              opacity: { delay: 0.5 + (i * 0.05), duration: 0.8 }
                            }}
                            className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-full"
                          />
                        ))}
                      </div>
                   </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 glass px-5 py-4 rounded-3xl flex items-center gap-3 border-white/20 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40">Secure.</div>
                <div className="text-sm font-bold tracking-tight">E2E Encryption</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 -left-12 glass p-6 rounded-[2.5rem] border-white/20 shadow-2xl space-y-4 w-72 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">Region Nodes</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Running</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#0c0c0c] bg-neutral-900 overflow-hidden relative">
                         <div className="absolute inset-0 bg-blue-500/10" />
                      </div>
                    ))}
                 </div>
                 <div className="text-sm font-bold tracking-tight">+42 Global</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Highlights Overlay */}
        <section className="mt-40 grid md:grid-cols-3 gap-8 relative z-10">
          <FeatureCard 
            icon={<Monitor size={24} />}
            title="Fluid Rendering"
            description="Our custom engine delivers buttery-smooth 120fps interfaces that react to every user interaction instantly."
          />
          <FeatureCard 
            icon={<Layers size={24} />}
            title="Smart Sharding"
            description="Automatically distribute workloads across our global network of high-performance compute nodes."
          />
          <FeatureCard 
            icon={<ShieldCheck size={24} />}
            title="Ironclad Security"
            description="Military-grade encryption and automated threat detection built into the core of every deployment."
          />
        </section>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-32 px-6 max-w-7xl mx-auto relative group">
        <div className="text-center space-y-6 mb-20">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            Real-time <span className="text-blue-500">Intelligence.</span>
          </motion.h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Gain deep insights into your network traffic, user behavior, and system performance with our state-of-the-art analytical engine.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 glass rounded-[3rem] p-10 border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10">
                <Play className="text-white/10 hover:text-white/40 transition-colors cursor-pointer" size={64} fill="currentColor" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center">
                      <Activity size={20} className="text-blue-400" />
                   </div>
                   <div className="text-lg font-bold tracking-tight">Traffic Flow v2</div>
                </div>
                
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 glass rounded-3xl border-white/10">
                         <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Peak Load</div>
                         <div className="text-3xl font-bold tracking-tighter">1.8 Gb/s</div>
                      </div>
                      <div className="p-6 glass rounded-3xl border-white/10">
                         <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Errors</div>
                         <div className="text-3xl font-bold tracking-tighter">0.003%</div>
                      </div>
                   </div>
                   
                   <div className="h-48 glass rounded-3xl border-white/10 p-8 flex items-end gap-2">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 10 }}
                          animate={{ height: Math.random() * 80 + 10 + '%' }}
                          transition={{ repeat: Infinity, repeatType: 'reverse', duration: Math.random() * 2 + 1 }}
                          className="flex-1 bg-blue-600/30 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"
                        />
                      ))}
                   </div>
                </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="glass rounded-[3rem] p-10 border-white/5 space-y-6">
                 <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center">
                    <Server size={24} />
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">Auto-Scaling</h3>
                 <p className="text-sm text-white/40 leading-relaxed">System automatically provisions resources based on predictive load models.</p>
                 <button 
                  onClick={() => scrollTo('infrastructure')}
                  className="flex items-center gap-2 text-sm font-bold text-blue-400 group/btn"
                 >
                   Explore Infrastructure <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
              
              <div className="glass rounded-[3rem] p-10 border-white/5 space-y-6 bg-gradient-to-br from-purple-600/10 to-transparent">
                 <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-purple-400">
                    <Cloud size={24} />
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight">Cloud Edge</h3>
                 <p className="text-sm text-white/40 leading-relaxed">Compute executes at the edge, reducing round-trip times to nearly zero.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section id="infrastructure" className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
               <motion.div 
                 whileHover={{ scale: 1.02 }}
                 className="relative glass rounded-[4rem] aspect-square p-2 border-white/10 group"
               >
                  <div className="w-full h-full rounded-[3.8rem] bg-[#0c0c0c] flex items-center justify-center relative overflow-hidden">
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 opacity-10"
                     >
                       <Globe size={800} strokeWidth={0.5} />
                     </motion.div>
                     <div className="relative z-10 text-center space-y-6">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 group-hover:scale-110 transition-transform">
                          <Zap size={40} className="text-blue-500" fill="currentColor" />
                        </div>
                        <div className="space-y-1">
                           <div className="text-4xl font-bold tracking-tighter">Global Mesh</div>
                           <div className="text-white/30 text-xs uppercase tracking-widest font-bold">Latency Visualization</div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

            <div className="space-y-12">
               <div className="space-y-6">
                  <h2 className="text-5xl font-bold tracking-tighter leading-tight">Infrastructure redefined for the <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">modern web.</span></h2>
                  <p className="text-white/50 text-lg leading-relaxed font-light">
                    We've rebuilt the stack from the hardware up. No more compromises on speed, reliability, or security.
                  </p>
               </div>

               <div className="space-y-10">
                  {[
                    { title: 'Zero Trust Architecture', desc: 'Identity-driven perimeter-less security across all layers.', icon: <Lock size={18} /> },
                    { title: 'Predictive Resource Allocation', desc: 'AI models forecast demand and scale services before users feel any lag.', icon: <Cpu size={18} /> },
                    { title: 'Distributed Ledger Sync', desc: 'Ultra-fast state synchronization across global regions.', icon: <Monitor size={18} /> }
                  ].map((feat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex gap-6 group cursor-default"
                    >
                       <div className="w-12 h-12 glass rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                          <div className="text-blue-400">{feat.icon}</div>
                       </div>
                       <div className="space-y-2 pt-2">
                          <h4 className="font-bold tracking-tight text-xl">{feat.title}</h4>
                          <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section id="enterprise" className="mt-40 mb-40 relative px-6 py-32 max-w-6xl mx-auto rounded-[4rem] glass overflow-hidden flex flex-col items-center text-center border-white/20">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
        <div className="relative z-10 space-y-10 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9]"
          >
            Ready to build <br /> the <span className="text-blue-600">impossible?</span>
          </motion.h2>
          <p className="text-xl text-white/50 font-light max-w-xl mx-auto leading-relaxed">
            Join the elite circle of developers and founders building the next generation of digital giants.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <button 
              onClick={() => setModalType('signup')}
              className="px-12 h-18 bg-white text-black font-extrabold text-lg rounded-3xl hover:scale-105 transition-all active:scale-95 shadow-2xl shadow-white/10"
            >
              Get Started Now
            </button>
            <button 
              onClick={() => setModalType('login')}
              className="px-12 h-18 glass text-white font-bold text-lg rounded-3xl hover:bg-white/5 transition-all"
            >
              Contact Growth
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="vision" className="border-t border-white/5 py-40 px-6 bg-gradient-to-t from-blue-600/5 to-transparent">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-20 text-sm text-white/30 tracking-tight">
          <div className="space-y-10">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap size={24} fill="white" />
              </div>
              <span className="font-bold text-2xl tracking-tighter uppercase">Stellar.</span>
            </div>
            <p className="max-w-sm leading-8 text-lg font-light">
              We're not just building a platform; we're crafting the foundations of the future web. Where performance meets poetry.
            </p>
            <div className="flex gap-4">
               {['Twitter', 'Discord', 'GitHub', 'LinkedIn'].map(social => (
                 <button key={social} className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:text-white transition-colors">
                   <div className="text-[10px] font-bold uppercase tracking-widest">{social.charAt(0)}</div>
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
            <div className="space-y-6">
              <div className="text-white font-bold tracking-widest uppercase text-[10px]">Product</div>
              <ul className="space-y-4">
                <li><button onClick={() => scrollTo('infrastructure')} className="hover:text-white transition-colors">Infrastructure</button></li>
                <li><button onClick={() => setModalType('docs')} className="hover:text-white transition-colors">Documentation</button></li>
                <li><button onClick={() => scrollTo('analytics')} className="hover:text-white transition-colors">Insights</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="text-white font-bold tracking-widest uppercase text-[10px]">Ecosystem</div>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Showcase</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Open Source</a></li>
              </ul>
            </div>
            <div className="hidden md:block space-y-6">
              <div className="text-white font-bold tracking-widest uppercase text-[10px]">Foundation</div>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">The Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vision 2030</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-xs font-mono text-white/10 uppercase tracking-[0.3em] font-bold">
             © 2026 STELLAR SYSTEMS INC // DEPLOYED IN NEOM
           </div>
           <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
           </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl z-40"
      >
        <ArrowUpRight size={24} className="-rotate-45" />
      </motion.button>
    </div>
  );
}
