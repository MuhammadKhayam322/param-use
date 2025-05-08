import fs from 'fs';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

type Member = {
  id: number;
  name: string;
  position: string;
  phone: string;
  description: string;
};

type Props = {
  member: Member | null;
};

export default function MemberDetail({ member }: Props) {
  if (!member) return <div className="p-6">Member not found</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{member.name}</h1>
      <p><strong>Position:</strong> {member.position}</p>
      <p><strong>Phone:</strong> {member.phone}</p>
      <p className="mt-4">{member.description}</p>

      <Link href="/">
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ← Back to Team
        </button>
      </Link>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'team.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const members: Member[] = JSON.parse(jsonData);

  const paths = members.map((member) => ({
    params: { id: member.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', 'team.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const members: Member[] = JSON.parse(jsonData);

  const member = members.find((m) => m.id.toString() === params?.id) || null;

  return {
    props: { member },
  };
};

