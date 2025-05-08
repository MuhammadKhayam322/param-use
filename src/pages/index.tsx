import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { GetStaticProps } from 'next';

type Member = {
  id: number;
  name: string;
  position: string;
};

type Props = {
  members: Member[];
};

export default function HomePage({ members }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      <div className="grid gap-4">
        {members.map((member) => (
          <Link key={member.id} href={`/team/${member.id}`}>
            <div className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p>{member.position}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'team.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const members = JSON.parse(jsonData);

  return {
    props: {
      members,
    },
  };
};


