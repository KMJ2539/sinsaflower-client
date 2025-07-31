interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ContentLayout = ({ title, children }: ContentLayoutProps) => {
  return (
    <div className="bg-white p-8 rounded shadow min-h-full">
      <div className="flex border-b border-b-gray-500 pb-2 mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {children}
    </div>
  );
};

export default ContentLayout;
