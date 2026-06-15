import {
  Calendar,
  FileText,
  Users,
  CheckCircle,
  ExternalLink,
  Award,
  BookOpen,
  Download,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { admissionService } from "../services/admissionService";
import { AdmissionCurrentResponse } from "../types";
import { Skeleton } from "../components/ui/skeleton";
import { SEO } from "../components/layout/SEO";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export function AdmissionPage() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<AdmissionCurrentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissionData = async () => {
      try {
        const admissionData = await admissionService.getCurrentAdmission();
        setData(admissionData);
      } catch (error) {
        console.error("Error fetching admission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissionData();
  }, []);

  const steps = [
    {
      icon: FileText,
      title: t("admission.step1Title"),
      description: t("admission.step1Desc"),
    },
    {
      icon: Calendar,
      title: t("admission.step2Title"),
      description: t("admission.step2Desc"),
    },
    {
      icon: Users,
      title: t("admission.step3Title"),
      description: t("admission.step3Desc"),
    },
    {
      icon: CheckCircle,
      title: t("admission.step4Title"),
      description: t("admission.step4Desc"),
    },
  ];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString(
      i18n.language === "ru" ? "ru-RU" : "uz-UZ",
      { month: "long" },
    );
    return `${day}-${month.toLowerCase()}`;
  };

  const info = data?.admission_info;
  const subjects = data?.subjects || [];
  const documents = data?.documents || [];

  return (
    <div className="min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEO
        title={t("nav.admission")}
        description={t("admission.pageSubtitle")}
      />
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0d89b1] to-[#0d89b1] text-white py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-black mb-6 uppercase tracking-[0.3em] border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              {info?.academic_year}{" "}
              {t("admission.academicYear", "O'quv yili uchun qabul")}
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight uppercase">
              {t("nav.admission")}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed font-bold opacity-90 uppercase tracking-widest">
              {t("admission.pageSubtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quota Stats Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl shadow-xl" />
              ))
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 text-center"
                >
                  <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                    {t("admission.totalQuota", "Umumiy kvota")}
                  </div>
                  <div className="text-4xl font-black text-[#0d89b1]">
                    {info?.total_quota}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 text-center"
                >
                  <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                    {t("admission.grantQuota", "Grant kvota")}
                  </div>
                  <div className="text-4xl font-black text-green-500">
                    {info?.grant_quota}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 text-center"
                >
                  <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                    {t("admission.contractQuota", "Shartnoma kvota")}
                  </div>
                  <div className="text-4xl font-black text-orange-500">
                    {info?.contract_quota}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 text-center"
                >
                  <div className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                    {t("admission.contractPrice", "Shartnoma narxi")}
                  </div>
                  <div className="text-xl font-black text-blue-500">
                    {info?.contract_price
                      ? parseInt(info.contract_price).toLocaleString()
                      : "0"}{" "}
                    {t("common.sum", "so'm")}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Admission Info Alert */}
      {info?.is_active && info?.online_apply_url && (
        <section className="py-6 bg-[#0d89b1]/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Alert className="bg-[#0d89b1] border-[#0d89b1] text-white shadow-lg">
                <Info className="h-5 w-5 text-white" />
                <AlertTitle className="text-white font-black">
                  {t(
                    "admission.onlineApplicationTitle",
                    "Onlayn ariza topshirish",
                  )}
                </AlertTitle>
                <AlertDescription className="text-white/90 font-medium">
                  {t(
                    "admission.onlineApplicationDesc",
                    "Arizangizni onlayn topshirish uchun quyidagi havolaga o'ting",
                  )}
                </AlertDescription>
                <div className="mt-4">
                  <a
                    href={info.online_apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0d89b1] rounded-lg hover:bg-gray-50 transition-all duration-300 font-black uppercase tracking-widest text-sm shadow-lg"
                  >
                    {t("admission.onlineApplyBtn", "Onlayn ariza berish")}
                    <ExternalLink size={18} />
                  </a>
                </div>
              </Alert>
            </motion.div>
          </div>
        </section>
      )}

      {/* Important Dates Section */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8" data-aos="fade-right">
                <div className="inline-block px-5 py-2 bg-[#0d89b1]/10 text-[#0d89b1] rounded-full text-xs font-black uppercase tracking-[0.2em]">
                  {t("admission.importantDates", "Muhim sanalar")}
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                  {t("admission.datesTitle", "Qabul jarayoni muddatlari")}
                </h2>

                <div className="space-y-4">
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 rounded-xl" />
                      ))
                    : [
                        {
                          label: t(
                            "admission.applicationPeriod",
                            "Hujjatlar qabuli",
                          ),
                          value: `${formatDate(info?.application_start || "")} — ${formatDate(info?.application_end || "")}`,
                          icon: FileText,
                          color: "text-blue-500",
                        },
                        {
                          label: t("admission.examDate", "Imtihon kuni"),
                          value: formatDate(info?.exam_date || ""),
                          icon: Calendar,
                          color: "text-orange-500",
                        },
                        {
                          label: t(
                            "admission.resultsDate",
                            "Natijalar e'lon qilinishi",
                          ),
                          value: formatDate(info?.results_date || ""),
                          icon: Award,
                          color: "text-green-500",
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 group hover:border-[#0d89b1] transition-all"
                        >
                          <div
                            className={`w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-md ${item.color}`}
                          >
                            <item.icon size={24} />
                          </div>
                          <div>
                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                              {item.label}
                            </div>
                            <div className="text-lg font-black text-gray-900 dark:text-white uppercase">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              <div className="flex-1" data-aos="fade-left">
                <div className="bg-[#0d89b1] rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                  <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
                    {t("admission.stepsTitle")}
                  </h3>
                  <div className="space-y-8 relative z-10">
                    {steps.map((step, idx) => (
                      <div key={idx} className="flex gap-6">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-black flex-shrink-0 border border-white/30">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-black uppercase tracking-wider mb-2">
                            {step.title}
                          </h4>
                          <p className="text-white/70 text-sm font-medium leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - GRID */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
                {t("admission.stepsTitle")}
              </h2>
              <div className="w-24 h-2 bg-[#0d89b1] mx-auto rounded-full shadow-lg shadow-[#0d89b1]/30"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 relative group hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0d89b1] text-white rounded-full flex items-center justify-center font-black shadow-lg">
                      {index + 1}
                    </div>
                    <div className="w-16 h-16 bg-[#0d89b1]/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-[#0d89b1] group-hover:text-white transition-all">
                      <Icon
                        size={32}
                        className="text-[#0d89b1] group-hover:text-white"
                      />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 leading-tight uppercase tracking-wider">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Subjects & Documents Grid */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
            {/* Subjects List */}
            <div data-aos="fade-up">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-[#0d89b1] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#0d89b1]/20">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  {t("admission.subjectsTitle", "Imtihon fanlari")}
                </h2>
              </div>

              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-xl" />
                    ))
                  : subjects.map((subject) => {
                      const trans = admissionService.getTranslation(
                        subject,
                        i18n.language,
                      );
                      return (
                        <div
                          key={subject.id}
                          className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-[#0d89b1] transition-all"
                        >
                          <div>
                            <div className="text-[10px] font-black text-[#0d89b1] uppercase tracking-[0.2em] mb-1">
                              {subject.subject_type_display}
                            </div>
                            <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                              {trans.subject_name}
                            </h4>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                              {t("admission.maxScore", "Maksimal ball")}
                            </div>
                            <div className="text-2xl font-black text-[#0d89b1]">
                              {subject.max_score}
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>

            {/* Documents List */}
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                  <FileText size={24} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  {t("admission.requiredDocs", "Kerakli hujjatlar")}
                </h2>
              </div>

              <div className="grid gap-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-xl" />
                    ))
                  : documents.map((doc) => {
                      const trans = admissionService.getTranslation(
                        doc,
                        i18n.language,
                      );
                      return (
                        <a
                          key={doc.id}
                          href={doc.document_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:bg-green-50 dark:hover:bg-green-900/10 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                              <Download size={20} />
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">
                                {trans.document_name}
                              </h4>
                              {trans.note && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                                  {trans.note}
                                </p>
                              )}
                            </div>
                          </div>
                          {doc.is_required && (
                            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100 dark:border-red-900/30">
                              {t("admission.required", "Majburiy")}
                            </div>
                          )}
                        </a>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Apply CTA */}
      {info?.online_apply_url && (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0d89b1]/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                {t("admission.portalTitle")}
              </h2>
              <p className="text-white/70 text-lg mb-10 font-medium leading-relaxed">
                {t("admission.portalDesc")}
              </p>
              <a
                href={info.online_apply_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#0d89b1] rounded-lg hover:bg-[#0d89b1] hover:text-white transition-all duration-500 font-black uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-2 group"
              >
                {t("admission.portalBtn")}
                <ExternalLink
                  size={24}
                  className="group-hover:rotate-45 transition-transform"
                />
              </a>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
