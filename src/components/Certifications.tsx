import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from "@/components/ui/card";
import { pmpCertification, otherCertifications } from '@/data/certificateData';

const Certifications = () => {
  const { t } = useLanguage();

  const CertificationCard = ({ cert }: { cert: typeof pmpCertification }) => (
    <Card 
      className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 
        hover:from-slate-700 hover:to-slate-600
        transition-all duration-300 
        border border-slate-600"
    >
      <div className="flex items-start space-x-4">
        <div className={`${cert.id === 2 ? 'w-48' : 'w-24'} h-24 flex-shrink-0 rounded-lg bg-slate-900 overflow-hidden`}>
          <img 
            src={cert.imageUrl} 
            alt={cert.title}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-3">
            {cert.title}
          </h3>
          <p className="text-sm text-gray-300">
            {cert.date}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="certifications" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-16 text-white">
          {t('certifications.title')}
        </h2>
        
        <div className="mb-6 max-w-xl mx-auto">
          <CertificationCard cert={pmpCertification} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherCertifications.map((cert) => (
            <CertificationCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;