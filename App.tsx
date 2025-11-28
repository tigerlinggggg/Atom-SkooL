
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Video, 
  Clock, 
  User, 
  BookOpen, 
  Award, 
  Shield, 
  MessageCircle, 
  Home, 
  GraduationCap, 
  Target, 
  CheckCircle2, 
  Zap, 
  Brain, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  UserCheck,
  Menu,
  X
} from 'lucide-react';
import { 
  APP_NAME, 
  CURRICULUM, 
  CAREER_PATH, 
  PRICING_PLANS, 
  FAQ as FAQ_DATA, 
  RIGHTS_CONTENT, 
  TIMELINE, 
  PROCESS_STEPS, 
  INTRO_TEXT, 
  WHY_JOIN, 
  HERO_STATS, 
  ELIGIBILITY,
  FORM_URL
} from './constants';
import GeminiChat from './components/GeminiChat';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('全部');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Get unique FAQ categories
  const faqCategories = ['全部', ...new Set(FAQ_DATA.map(item => item.category || '其他'))];
  
  // Filter FAQs based on category
  const filteredFaqs = selectedFaqCategory === '全部' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => (item.category || '其他') === selectedFaqCategory);

  return (
    <div className="flex flex-col h-screen bg-neutral-50 text-neutral-800 font-sans overflow-hidden">
      
      {/* Navigation (Fixed) */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-neutral-100 h-[70px] flex items-center">
        <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 mr-4"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 rounded-xl bg-blue-900 flex items-center justify-center text-yellow-400 font-bold text-xs border border-blue-800">爆</div>
            <div className="text-xl font-bold tracking-tight text-blue-900 whitespace-nowrap hidden md:block">{APP_NAME}</div>
          </div>
          
          {/* Desktop Tabs */}
          <div className="hidden xl:flex space-x-1 p-1">
            {[
              { id: 'home', label: '首頁' },
              { id: 'intro', label: '計畫介紹' },
              { id: 'curriculum', label: '課程亮點' },
              { id: 'ladder', label: '成長階梯' },
              { id: 'fees', label: '課程費用' },
              { id: 'rights', label: '權利義務' },
              { id: 'faq', label: '常見問答' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-neutral-500 hover:text-blue-900 hover:bg-neutral-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="flex-shrink-0 ml-4 flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('apply')}
              className={`hidden md:flex px-6 py-2.5 rounded-lg font-bold transition-all items-center gap-2 whitespace-nowrap text-sm ${
                activeTab === 'apply'
                ? 'bg-yellow-400 text-blue-900 shadow-md transform scale-105'
                : 'bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:shadow-md'
              }`}
            >
              立即報名 <ArrowRight className="w-4 h-4" />
            </button>
            
            {/* Mobile Menu Toggle */}
            <button className="xl:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Tabs / Menu */}
      {isMobileMenuOpen && (
         <div className="xl:hidden fixed top-[70px] inset-x-0 bg-white border-b border-neutral-100 z-40 p-4 shadow-lg animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'home', label: '首頁', icon: Home },
                  { id: 'intro', label: '計畫介紹', icon: Users },
                  { id: 'curriculum', label: '課程亮點', icon: BookOpen },
                  { id: 'ladder', label: '成長階梯', icon: Target },
                  { id: 'fees', label: '課程費用', icon: Award },
                  { id: 'rights', label: '權利義務', icon: Shield },
                  { id: 'faq', label: '常見問答', icon: MessageCircle },
                  { id: 'apply', label: '立即報名', icon: Zap },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }}
                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-900 border border-blue-100' 
                        : 'bg-white text-neutral-600 border border-neutral-100 hover:bg-neutral-50'
                    }`}
                  >
                    <Home className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-neutral-400'}`}/>
                    {tab.label}
                  </button>
                ))}
            </div>
         </div>
      )}

      {/* Mobile Sticky Tabs (Icon only) - visible when menu closed */}
      {!isMobileMenuOpen && (
        <div className="xl:hidden fixed top-[70px] w-full bg-white/95 backdrop-blur border-b border-neutral-100 z-30 overflow-x-auto no-scrollbar h-[50px] flex items-center shadow-sm">
            <div className="flex px-4 gap-2 min-w-max">
            {[
                { id: 'home', label: '首頁' },
                { id: 'intro', label: '介紹' },
                { id: 'curriculum', label: '課程' },
                { id: 'ladder', label: '成長' },
                { id: 'fees', label: '費用' },
                { id: 'rights', label: '權利' },
                { id: 'faq', label: 'FAQ' },
            ].map((tab) => (
                <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                    activeTab === tab.id 
                    ? 'bg-blue-900 text-white shadow-sm' 
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                >
                {tab.label}
                </button>
            ))}
            </div>
        </div>
      )}

      {/* Main Content Area */}
      <main ref={mainContentRef} className="flex-grow pt-[120px] xl:pt-[70px] w-full overflow-y-auto bg-neutral-50 scroll-smooth">
        <div key={activeTab} className="w-full animate-fade-in flex flex-col min-h-full">
          
          {/* === TAB 1: 首頁 === */}
          {activeTab === 'home' && (
            <>
              <header className="relative py-24 overflow-hidden bg-white border-b border-neutral-100">
                {/* Lighter, more subtle background blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-yellow-50 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    全台最大自主學習引導師培訓基地
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-neutral-900 tracking-tight">
                    在 <span className="text-blue-600">AI</span> 都能教學的時代<br className="hidden md:block" />
                    唯有你能<span className="text-yellow-500 marker-underline mx-2">「引導」</span>思考
                  </h1>
                  <p className="text-lg text-neutral-500 font-medium mb-10">成為不可被取代的教育設計師</p>
                  
                  <div className="flex flex-wrap justify-center gap-6 mb-12 text-neutral-600">
                    {HERO_STATS.map((stat, i) => (
                       <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-neutral-100 shadow-sm">
                          {i === 0 ? <MapPin className="w-4 h-4 text-blue-600"/> : i === 1 ? <Users className="w-4 h-4 text-yellow-500"/> : <Award className="w-4 h-4 text-green-500"/>}
                          <span className="font-bold text-sm">{stat.num} {stat.label}</span>
                       </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => setActiveTab('apply')} className="px-8 py-3.5 bg-blue-900 text-white rounded-xl font-bold text-base shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                      申請加入計畫 <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => setActiveTab('intro')} className="px-8 py-3.5 bg-white text-neutral-700 border border-neutral-200 rounded-xl font-bold text-base hover:bg-neutral-50 hover:border-neutral-300 transition-all">
                      了解更多細節
                    </button>
                  </div>
                </div>
              </header>

              <section className="py-24 bg-white border-b border-neutral-100">
                <div className="container mx-auto px-6">
                   <div className="max-w-3xl mx-auto text-center space-y-10">
                      <p className="text-xl text-neutral-600 leading-relaxed font-medium">
                        {INTRO_TEXT.question}
                      </p>
                      
                      <div className="py-2 relative inline-block">
                        <h2 className="text-4xl font-extrabold text-neutral-900 relative z-10">
                          {INTRO_TEXT.answer.split('：')[0]}：<span className="text-blue-900">{INTRO_TEXT.answer.split('：')[1]}</span>
                        </h2>
                        <div className="absolute bottom-2 left-0 w-full h-3 bg-yellow-200/50 -z-0 -rotate-1 rounded-sm"></div>
                      </div>

                      <p className="text-lg text-neutral-500 leading-relaxed">
                        {INTRO_TEXT.desc.split('。')[0]}。<br/>
                        {INTRO_TEXT.desc.split('。')[1]}。
                      </p>
                      
                      <p className="text-xl font-bold text-blue-900 pt-2 border-t-2 border-neutral-100 inline-block px-8">
                        {INTRO_TEXT.desc.split('。')[2]}。
                      </p>
                   </div>
                </div>
              </section>

              <section className="py-24 bg-neutral-50 flex-grow">
                <div className="container mx-auto px-6">
                   <div className="text-center mb-16">
                     <h3 className="text-3xl font-extrabold text-neutral-900">三大理由，讓你成為最強引導師</h3>
                   </div>
                   <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {WHY_JOIN.map((item, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                          <div className={`w-12 h-12 bg-${item.color}-50 rounded-xl flex items-center justify-center text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                             {item.icon === 'MessageCircle' && <MessageCircle className="w-6 h-6" />}
                             {item.icon === 'Brain' && <Brain className="w-6 h-6" />}
                             {item.icon === 'Zap' && <Zap className="w-6 h-6" />}
                          </div>
                          <h4 className="text-xl font-bold mb-4 text-neutral-900">{item.title}</h4>
                          <p className="text-neutral-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            </>
          )}

          {/* === TAB 2: 計畫介紹 === */}
          {activeTab === 'intro' && (
            <section className="py-24 bg-neutral-50 flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Eligibility & Job</h2>
                  <h3 className="text-3xl font-extrabold text-neutral-900">培育對象與職務</h3>
                </div>
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-neutral-100 max-w-5xl mx-auto">
                   <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-10">
                         <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100"><GraduationCap size={24}/></div>
                            <div>
                               <h4 className="font-bold text-lg text-neutral-900 mb-2">培育對象</h4>
                               <p className="text-neutral-500 text-sm leading-relaxed">{ELIGIBILITY.target}</p>
                            </div>
                         </div>
                         <div className="flex gap-5">
                            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0 border border-yellow-100"><Clock size={24}/></div>
                            <div>
                               <h4 className="font-bold text-lg text-neutral-900 mb-2">時間彈性</h4>
                               <p className="text-neutral-500 text-sm leading-relaxed">{ELIGIBILITY.condition}</p>
                            </div>
                         </div>
                      </div>
                      <div className="bg-neutral-50 rounded-xl p-8 border border-neutral-100 h-full flex flex-col justify-center">
                         <h4 className="font-bold text-lg text-neutral-900 mb-6 flex items-center gap-2">
                           <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                           職務描述
                         </h4>
                         <ul className="space-y-4 text-sm text-neutral-600 font-medium">
                           {ELIGIBILITY.jobs.map((job, i) => (
                             <li key={i} className="flex gap-3 items-start">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                               <span className="leading-relaxed">{job}</span>
                             </li>
                           ))}
                         </ul>
                      </div>
                   </div>
                </div>
              </div>
            </section>
          )}

          {/* === TAB 3: 課程亮點 === */}
          {activeTab === 'curriculum' && (
            <section className="py-24 bg-white flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                   <h2 className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Curriculum Schedule</h2>
                   <h3 className="text-3xl font-extrabold text-neutral-900">課程時間表</h3>
                   <p className="text-neutral-400 mt-3 font-medium">3+1 虛實整合：從理論到實戰的完整旅程</p>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-6">
                   {CURRICULUM.map((day, i) => (
                     <div key={i} className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all hover:shadow-md
                        ${day.theme === 'blue' ? 'border-blue-100 hover:border-blue-200' : 
                          day.theme === 'yellow' ? 'border-yellow-100 hover:border-yellow-200' : 'border-green-100 hover:border-green-200'}
                     `}>
                        <div className={`px-6 py-4 flex justify-between items-center border-b
                           ${day.theme === 'blue' ? 'bg-blue-50/50 border-blue-50' : 
                             day.theme === 'yellow' ? 'bg-yellow-50/50 border-yellow-50' : 'bg-green-50/50 border-green-50'}
                        `}>
                           <div className="font-bold text-lg flex items-center gap-3 text-neutral-800">
                             {day.type === 'online' ? <Video size={18} className="text-neutral-400"/> : <MapPin size={18} className="text-neutral-400"/>} 
                             {day.date}
                           </div>
                           <div className={`text-xs font-bold px-3 py-1 rounded-full border
                             ${day.theme === 'blue' ? 'bg-white text-blue-600 border-blue-100' : 
                               day.theme === 'yellow' ? 'bg-white text-yellow-600 border-yellow-100' : 'bg-white text-green-600 border-green-100'}
                           `}>
                             {day.type === 'online' ? '線上' : day.type === 'physical' ? '實體' : '檢核'}
                           </div>
                        </div>
                        <div className="p-6 md:p-8">
                           {day.items ? (
                             <div className="space-y-8 relative">
                               <div className="absolute left-[5.5rem] top-2 bottom-2 w-px bg-neutral-100 hidden md:block"></div>
                               {day.items.map((item, idx) => (
                                 <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-10 relative">
                                    <div className="md:w-20 font-bold text-neutral-900 flex-shrink-0 text-sm pt-0.5">
                                      {item.t.split('(')[0].split('-')[0]}
                                      {/* Simplified time display for cleaner look */}
                                    </div>
                                    <div className="flex-grow">
                                       <h4 className="font-bold text-base text-neutral-900 mb-2">{item.title}</h4>
                                       <p className="text-sm text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                                <div className="md:w-24 font-bold text-neutral-900 flex-shrink-0 text-sm">{day.time}</div>
                                <div>
                                   <h4 className="font-bold text-base text-neutral-900 mb-2">{day.title}</h4>
                                   <p className="text-sm text-neutral-500 leading-relaxed font-medium">{day.desc}</p>
                                </div>
                             </div>
                           )}
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </section>
          )}

          {/* === TAB 4: 成長階梯 === */}
          {activeTab === 'ladder' && (
            <section className="py-24 bg-neutral-50 flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Growth Path</h2>
                  <h3 className="text-3xl font-extrabold text-neutral-900">學員身份轉換機制</h3>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-6xl mx-auto">
                  {CAREER_PATH.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className={`w-full md:w-1/3 p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative bg-white
                        ${i === 2 ? 'border-blue-100 ring-2 ring-blue-50' : 
                          i === 1 ? 'border-yellow-200' : 
                          'border-neutral-100'}`}>
                        
                        {i === 1 && <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-md">關鍵轉折</div>}
                        
                        <div className="mb-6">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider
                            ${i === 2 ? 'bg-blue-100 text-blue-700' : 
                              i === 1 ? 'bg-yellow-50 text-yellow-700' : 'bg-neutral-100 text-neutral-600'}`}>
                            {i === 2 ? 'Goal' : `Stage ${step.step}`}
                          </span>
                        </div>
                        
                        <h3 className={`text-xl font-bold mb-2 text-neutral-900`}>{step.title}</h3>
                        <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">{step.subtitle}</div>
                        
                        <div className={`text-sm space-y-3 mb-8 flex-grow text-neutral-600 font-medium`}>
                          <p className="flex gap-2"><span className="text-neutral-300">•</span> {step.desc}</p>
                          <p className="flex gap-2"><span className="text-neutral-300">•</span> {step.subDesc}</p>
                        </div>
                        
                        <div className={`pt-6 border-t text-center font-bold text-xs uppercase tracking-widest
                          ${i === 2 ? 'border-neutral-100 text-blue-600' : 
                            i === 1 ? 'border-neutral-100 text-yellow-600' : 'border-neutral-100 text-neutral-400'}`}>
                          {i === 2 ? '專業職涯' : i === 1 ? '實戰轉化' : '基礎奠定'}
                        </div>
                      </div>
                      {i < 2 && <div className="hidden md:flex items-center text-neutral-300"><ArrowRight size={20}/></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* === TAB 5: 課程費用 === */}
          {activeTab === 'fees' && (
            <section className="py-24 bg-white flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                   <h2 className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Pricing</h2>
                   <h3 className="text-3xl font-extrabold text-neutral-900">課程費用</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                    {PRICING_PLANS.map((plan, i) => (
                      <div key={i} className={`bg-white p-8 rounded-2xl text-center border order-${i === 1 ? 1 : i === 0 ? 2 : 3} md:order-${i+1} transition-all duration-300 cursor-pointer group
                        ${plan.highlight ? 'shadow-xl transform md:-translate-y-4 border-yellow-200 ring-4 ring-yellow-50 relative' : 'border-neutral-100 hover:border-neutral-200 hover:shadow-lg'}`}>
                        
                        {plan.highlight && (
                          <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                            <span className="bg-yellow-400 text-blue-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                              {plan.tag}
                            </span>
                          </div>
                        )}
                        
                        <div className={plan.highlight ? 'mt-2' : ''}>
                          <div className={`text-xs font-bold uppercase mb-6 tracking-widest ${plan.highlight ? 'text-yellow-600' : 'text-neutral-400'}`}>{plan.name}</div>
                          <div className={`text-4xl font-extrabold mb-3 tracking-tight ${plan.highlight ? 'text-blue-900' : 'text-neutral-900'}`}>
                            {plan.price}
                          </div>
                          <div className={`text-sm mb-8 font-medium ${plan.highlight ? 'text-green-600' : 'text-neutral-400'}`}>
                            {plan.note}
                          </div>
                          <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all
                            ${plan.highlight ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md' : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-100'}`}>
                            {plan.btn}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                
                <div className="max-w-4xl mx-auto border-t border-neutral-100 pt-16">
                   <h4 className="text-center text-lg font-bold text-neutral-900 mb-10">關於「回捐機制」的透明對話</h4>
                   <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                        <strong className="text-blue-600 block mb-3 text-sm uppercase tracking-wide">組織投入 Support</strong>
                        <p className="text-sm text-neutral-600 font-medium leading-relaxed">學校端媒合、Mentor 督導、教案研發授權、保險行政。</p>
                      </div>
                      <div className="flex-1 bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                        <strong className="text-yellow-600 block mb-3 text-sm uppercase tracking-wide">學員獲得 Gain</strong>
                        <p className="text-sm text-neutral-600 font-medium leading-relaxed">價值萬元培訓、真實教學履歷、個人化回饋。</p>
                      </div>
                   </div>
                </div>
              </div>
            </section>
          )}

          {/* === TAB 6: 權利義務 === */}
          {activeTab === 'rights' && (
            <section className="py-24 bg-neutral-50 flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                   <h2 className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">Rights & Obligations</h2>
                   <h3 className="text-3xl font-extrabold text-neutral-900">權利義務須知</h3>
                   <p className="text-neutral-400 mt-3 font-medium">本計畫分為三個期程，以下詳細說明。</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                   {RIGHTS_CONTENT.map((stage, i) => (
                     <div key={i} className={`rounded-2xl p-8 border shadow-sm relative overflow-hidden bg-white
                       ${stage.theme === 'blue' ? 'border-blue-100' : ''}
                       ${stage.theme === 'yellow' ? 'border-yellow-100' : ''}
                       ${stage.theme === 'green' ? 'border-green-100' : ''}
                       ${stage.theme === 'gray' ? 'border-neutral-100 bg-neutral-50/50' : ''}
                     `}>
                        {stage.badge && (
                          <div className={`absolute top-6 right-6 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider
                            ${stage.theme === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}
                          `}>{stage.badge}</div>
                        )}
                        
                        <h4 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-3">
                           {stage.icon === 'user-check' && <UserCheck className="w-5 h-5 text-neutral-400"/>}
                           {stage.icon === 'number-1' && <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>}
                           {stage.icon === 'number-2' && <span className="bg-yellow-100 text-yellow-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>}
                           {stage.icon === 'number-3' && <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>}
                           {stage.title}
                        </h4>
                        
                        <ul className="space-y-4 text-sm text-neutral-600 font-medium">
                           {stage.items.map((item, idx) => (
                             <li key={idx} className="flex gap-3 items-start">
                               {stage.type === 'recruitment' 
                                 ? <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 flex-shrink-0"></div>
                                 : stage.type === 'training' 
                                   ? <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"/>
                                   : <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${stage.theme === 'yellow' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                               }
                               
                               <span className={`leading-relaxed ${item.isHighlightBg ? 'highlight-bg inline-block px-2 py-0.5 rounded text-yellow-900' : ''}`}>
                                 {item.text.split(item.highlight || '').map((part, pIdx) => (
                                   <React.Fragment key={pIdx}>
                                     {part}
                                     {pIdx === 0 && item.highlight && (
                                       <span className={`font-bold ${stage.type === 'training' || stage.type === 'recruitment' || stage.type === 'official' ? 'text-neutral-900 border-b-2 border-yellow-200' : 'text-blue-700'}`}>
                                         {item.highlight}
                                       </span>
                                     )}
                                   </React.Fragment>
                                 ))}
                               </span>
                             </li>
                           ))}
                        </ul>
                     </div>
                   ))}
                </div>
              </div>
            </section>
          )}

          {/* === TAB 7: FAQ === */}
          {activeTab === 'faq' && (
            <section className="py-24 bg-white flex-grow">
              <div className="container mx-auto px-6 max-w-4xl">
                 <div className="text-center mb-12">
                  <h3 className="text-3xl font-extrabold text-neutral-900">常見問題 FAQ</h3>
                 </div>

                 {/* Category Filters */}
                 <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {faqCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedFaqCategory(category);
                          setActiveFaq(null); // Reset open FAQ
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border
                          ${selectedFaqCategory === category
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-neutral-500 border-neutral-200 hover:border-blue-300 hover:text-blue-700'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                 </div>

                 <div className="space-y-4">
                      {filteredFaqs.map((faq, index) => (
                        <div key={index} className="bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                          <button onClick={() => toggleFaq(index)} className="w-full px-8 py-6 text-left flex justify-between items-start bg-white hover:bg-neutral-50/50 transition">
                            <div>
                              <div className="text-xs font-bold text-blue-500 mb-2">{faq.category}</div>
                              <span className="font-bold text-base text-neutral-800 leading-snug">{faq.question}</span>
                            </div>
                            <div className="pt-1 pl-4">
                              {activeFaq === index ? <ChevronUp className="w-5 h-5 text-neutral-400" /> : <ChevronDown className="w-5 h-5 text-neutral-300" />}
                            </div>
                          </button>
                          {activeFaq === index && (
                            <div className="px-8 py-6 bg-neutral-50 text-neutral-600 leading-relaxed text-sm font-medium border-t border-neutral-50 whitespace-pre-wrap">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
              </div>
            </section>
          )}

          {/* === APPLY TAB === */}
          {activeTab === 'apply' && (
            <section className="py-24 bg-blue-900 text-white flex-grow">
              <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                   <h2 className="text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">Process</h2>
                   <h3 className="text-3xl font-extrabold text-white">審核＆面試流程</h3>
                </div>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto mb-20">
                    {PROCESS_STEPS.map((item, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-blue-800/30 backdrop-blur-sm p-8 rounded-2xl border border-blue-700/50 w-full md:w-64 text-center hover:bg-blue-800/50 transition-colors">
                           <div className="w-8 h-8 rounded-full bg-yellow-400 text-blue-900 font-bold flex items-center justify-center mx-auto mb-4 text-sm">{item.step}</div>
                           <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                           <p className="text-sm text-blue-200 font-medium">{item.desc}</p>
                        </div>
                        {i < 3 && <ArrowRight className="hidden md:block text-blue-500/50 w-6 h-6" />}
                      </React.Fragment>
                    ))}
                </div>
                
                <div className="bg-white rounded-3xl p-10 md:p-14 text-neutral-900 shadow-2xl max-w-3xl mx-auto border-4 border-blue-800/20">
                  <h2 className="text-2xl font-extrabold text-center mb-12 text-neutral-900">2026 招募重要時程</h2>
                  <div className="space-y-8">
                      {TIMELINE.map((item, index) => (
                        <div key={index} className="flex items-start gap-6 group">
                          <div className="w-24 flex-shrink-0 text-right pt-1"><span className={`font-bold text-sm ${item.active ? 'text-yellow-600' : 'text-neutral-400'}`}>{item.date}</span></div>
                          <div className="relative pt-2 flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full z-10 ${item.active ? 'bg-yellow-500 ring-4 ring-yellow-100' : 'bg-neutral-200'}`}></div>
                            {index !== 2 && <div className="absolute top-3 w-0.5 h-16 bg-neutral-100 -z-0"></div>}
                          </div>
                          <div className="pb-4">
                            <h4 className={`text-base font-bold mb-1 ${item.active ? 'text-neutral-900' : 'text-neutral-500'}`}>{item.title}</h4>
                            <p className="text-neutral-400 text-sm font-medium">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="mt-12 text-center">
                     <a href={FORM_URL} target="_blank" className="inline-flex items-center gap-2 px-10 py-4 bg-blue-900 text-white rounded-xl font-bold text-base hover:bg-blue-800 shadow-lg hover:-translate-y-1 transition-all w-full md:w-auto justify-center">
                        前往報名表單 <ArrowRight size={18}/>
                     </a>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
        
        {/* Footer */}
        <footer className="bg-white border-t border-neutral-100 py-10 w-full mt-auto">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center items-center gap-3 mb-5">
                    <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 font-bold text-[10px]">爆</div>
                    <div className="text-lg font-bold text-neutral-400 tracking-tight">2026 爆學院</div>
                </div>
                <p className="text-neutral-400 mb-8 text-sm font-medium">點燃學習的動機，從你開始。</p>
                <div className="flex justify-center gap-6 text-sm text-neutral-400 font-medium mb-8">
                  <a href="#" className="hover:text-blue-600 transition">Facebook</a>
                  <a href="#" className="hover:text-blue-600 transition">Instagram</a>
                  <a href="#" className="hover:text-blue-600 transition">聯絡我們</a>
                </div>
                <div className="text-xs text-neutral-300">© 2026 Bao Academy. All rights reserved.</div>
            </div>
        </footer>
      </main>

      {/* Chat Widget */}
      <GeminiChat />
    </div>
  );
};

export default App;
