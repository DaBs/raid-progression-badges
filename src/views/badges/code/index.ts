import { badgen } from 'badgen';

interface CodeBadgeViewParams {
    zoneName: string;
    progress: string;
    color: string;
}


const template = ({ zoneName, progress, color }: CodeBadgeViewParams) => badgen({ label: zoneName, status: progress, color });

export default template;