import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { 
  BarChart3, 
  TrendingUp, 
  GitBranch, 
  Percent, 
  Activity, 
  PieChart,
  LineChart,
  Layers
} from 'lucide-react';
import CTASection from '@/components/sections/CTASection';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'methods' });

  return {
    title: `${t('title')} | BioLabData`,
    description: t('subtitle'),
  };
}

export default async function MethodsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'methods' });

  const methodCategories = [
    {
      icon: BarChart3,
      title: t('categories.descriptive'),
      methods: locale === 'bg' 
        ? ['Средни стойности и медиани', 'Стандартно отклонение', 'Честотни разпределения', 'Percentiles и квартили', 'Графично представяне']
        : ['Means and medians', 'Standard deviation', 'Frequency distributions', 'Percentiles and quartiles', 'Graphical representation'],
      color: 'bg-primary-50 text-primary-600 border-primary-200',
    },
    {
      icon: TrendingUp,
      title: t('categories.parametric'),
      methods: locale === 'bg'
        ? ['Student t-test', 'One-way ANOVA', 'Two-way ANOVA', 'Repeated measures ANOVA', 'Post-hoc тестове']
        : ['Student t-test', 'One-way ANOVA', 'Two-way ANOVA', 'Repeated measures ANOVA', 'Post-hoc tests'],
      color: 'bg-accent-50 text-accent-600 border-accent-200',
    },
    {
      icon: GitBranch,
      title: t('categories.nonparametric'),
      methods: locale === 'bg'
        ? ['Mann-Whitney U тест', 'Wilcoxon signed-rank', 'Kruskal-Wallis тест', 'Friedman тест', 'Chi-square тест']
        : ['Mann-Whitney U test', 'Wilcoxon signed-rank', 'Kruskal-Wallis test', 'Friedman test', 'Chi-square test'],
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      icon: Percent,
      title: t('categories.correlation'),
      methods: locale === 'bg'
        ? ['Pearson корелация', 'Spearman корелация', 'Partial корелация', 'Point-biserial', 'Cramer\'s V']
        : ['Pearson correlation', 'Spearman correlation', 'Partial correlation', 'Point-biserial', 'Cramer\'s V'],
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      icon: LineChart,
      title: t('categories.regression'),
      methods: locale === 'bg'
        ? ['Линейна регресия', 'Множествена регресия', 'Логистична регресия', 'Полиномна регресия', 'Ridge/Lasso регресия']
        : ['Linear regression', 'Multiple regression', 'Logistic regression', 'Polynomial regression', 'Ridge/Lasso regression'],
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      icon: Activity,
      title: t('categories.survival'),
      methods: locale === 'bg'
        ? ['Kaplan-Meier анализ', 'Cox regression', 'Log-rank тест', 'Hazard ratios', 'Survival криви']
        : ['Kaplan-Meier analysis', 'Cox regression', 'Log-rank test', 'Hazard ratios', 'Survival curves'],
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      icon: PieChart,
      title: locale === 'bg' ? 'Диагностични тестове' : 'Diagnostic Tests',
      methods: locale === 'bg'
        ? ['ROC анализ', 'Sensitivity/Specificity', 'AUC изчисление', 'Positive/Negative predictive value', 'Likelihood ratios']
        : ['ROC analysis', 'Sensitivity/Specificity', 'AUC calculation', 'Positive/Negative predictive value', 'Likelihood ratios'],
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    },
    {
      icon: Layers,
      title: t('categories.advanced'),
      methods: locale === 'bg'
        ? ['Meta-анализ', 'Mixed effects модели', 'Factor анализ', 'Cluster анализ', 'Machine learning']
        : ['Meta-analysis', 'Mixed effects models', 'Factor analysis', 'Cluster analysis', 'Machine learning'],
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Methods Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {methodCategories.map((category, index) => (
              <div
                key={index}
                className={`card p-6 border-2 ${category.color.split(' ')[2]} hover:shadow-lg transition-shadow`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${category.color.split(' ').slice(0, 2).join(' ')} flex items-center justify-center mb-4`}
                >
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.methods.map((method, i) => (
                    <li key={i} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${category.color.split(' ')[1].replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              {locale === 'bg' 
                ? 'Нуждаете се от метод, който не е в списъка?' 
                : 'Need a method not listed here?'}
            </h2>
            <p className="text-neutral-600 mb-6">
              {locale === 'bg'
                ? 'Ние работим с широк спектър от статистически методи. Свържете се с нас, за да обсъдим вашите специфични нужди.'
                : 'We work with a wide range of statistical methods. Contact us to discuss your specific needs.'}
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
