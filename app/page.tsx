import Cadeiras from '@/components/cadeiras';
import Turmas from '@/components/turmas';

export default function Home() {
	return (
		<div className="container h-full gap-5 flex flex-col lg:flex-row py-5 lg:items-start">
			<Cadeiras className="lg:basis-2/5" />
			<Turmas className="lg:basis-3/5" />
		</div>
	);
}
