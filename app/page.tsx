import Cadeiras from '@/components/cadeiras';
import Grade from '@/components/grade';
import Turmas from '@/components/turmas';

export default function Home() {
	return (
		<div className="container h-full gap-5 flex flex-col lg:flex-row py-5 lg:flex-wrap">
			<Cadeiras className="lg:basis-1/3" />
			<Turmas className="lg:grow" />
			<Grade className="lg:basis-full" />
		</div>
	);
}
