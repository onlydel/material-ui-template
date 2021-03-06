import { NextPage } from 'next';
import ProjectSettingsLayout from '~/layouts/ProjectSettingsLayout';
import PanelCard from '~/modules/components/CardTypePanel';
import ProjectSettingsForm from '~/components/ProjectSettingsForm';

const ProjectSettingsPage: NextPage = () => {
  return (
    <ProjectSettingsLayout pageTitle="프로젝트 설정">
      <PanelCard headerTitle="코드 편집기 설정" showHeaderDivider>
        <ProjectSettingsForm />
      </PanelCard>
    </ProjectSettingsLayout>
  );
};

export default ProjectSettingsPage;
