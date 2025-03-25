type Props = {
  title: string;
  subtitle?: string;
};

const MainHeadingTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="flex flex-col bg-title-section-menu rounded-xl p-3 gap-2 text-center">
      <span className="text-white font-bold text-3xl">{title}</span>
      {subtitle && <p className="text-gray-100 text-xl">{subtitle}</p>}
    </div>
  );
};

export default MainHeadingTitle;
