interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}

const ContentLayout = ({ title, children, aside }: ContentLayoutProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 min-h-full">
      <div className="flex border-b border-primary/20 pb-4 mb-8 justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h2 className="text-2xl font-bold text-dark bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">{aside}</div>
      </div>

      {children}
    </div>
  );
};

export default ContentLayout;
