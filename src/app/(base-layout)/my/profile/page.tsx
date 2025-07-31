import EditUserForm from "@/features/auth/components/EditUserForm";
import ContentLayout from "@/shared/components/layout/ContentLayout";

export default function Page() {
  return (
    <ContentLayout title="회원 정보 수정">
      <EditUserForm />
    </ContentLayout>
  );
}
