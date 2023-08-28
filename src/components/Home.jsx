import "../css/main.css";
import { useEffect, useState } from "react";

const categoryId = {
	index: 0,
	fashion: 3,
	tech: 1,
	politics: 4,
	sport: 2,
};

const categoryName = {
	index: "главная",
	fashion: "мода",
	tech: "технологии",
	politics: "политика",
	sport: "спорт",
};

function Navigation({ onNavClick, currentCategory }) {
	return (
		<>
			<a
				className="mr-[50px] shrink-0"
				href="/"
				data-href="index"
				onClick={onNavClick}
			>
				<img
					className="w-full h-[90px]"
					src="/img/logo.svg"
					alt="logo"
				/>
			</a>
			<nav>
				<ul className="flex gap-[60px] font-bold text-2xl">
					{["index", "fashion", "tech", "politics", "sport"].map((element) => {
						return (
							<li key={element}>
								<a
									className=" hover:text-orange"
									href="#"
									data-href={element}
									onClick={onNavClick}
								>
									{currentCategory[element]}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}

function MainArticle({ title, image, category, description, source }) {
	return (
		<article className="flex flex-row-reverse gap-5">
			<div className="flex flex-col justify-between shrink grow-[3] basis-2/3">
				<h1 className="text-[42px] leading-[50px] font-medium">{title}</h1>
				<span className="text-sm leading-6 font-medium text-orange uppercase -order-1">
					{category}
				</span>
				<p className="leading-[26px] mt-8">{description}</p>
				<span className="text-sm leading-none font-normal text-grey uppercase">
					{source}
				</span>
			</div>
			<div className="grow shrink-0 basis-1/3">
				<img
					className="object-cover"
					src={encodeURI(image)}
					alt="article image"
				/>
			</div>
		</article>
	);
}

function SecondArticle({ title, date, source }) {
	<li>
		<article className="border-l-8 pl-2">
			<h2>{title}</h2>
			<span className="text-xl font-normal leading-6 text-orange uppercase">
				{new Date(date).toLocaleDateString("ru-RU", {
					month: "long",
					day: "numeric",
				})}
			</span>
			<span className="ml-1.5 text-xl font-normal leading-6 text-grey uppercase">
				{source}
			</span>
		</article>
	</li>;
}

export default function Home() {
	const [category, setCategory] = useState("index");
	const [articles, setArticles] = useState({
		items: [],
		categories: [],
		sources: [],
	});

	function onNavClick(event) {
		event.preventDefault();
		setCategory(event.currentTarget.dataset.href);
	}

	useEffect(() => {
		fetch(
			"https://frontend.karpovcourses.net/api/v2/ru/news/" +
				categoryId[category] || ""
		)
			.then((response) => response.json())
			.then((data) => {
				setArticles(data);
			});
	}, [category]);

	return (
		<div className="container max-2xl:max-w-none h-screen grid grid-rows-layout gap-[135px]">
			<header className="flex mt-9">
				<Navigation
					onNavClick={onNavClick}
					currentCategory={categoryName}
				/>
			</header>

			<main className="flex justify-between gap-[90px]">
				<section className="flex flex-col gap-[50px]">
					{articles.items.slice(0, 3).map((item) => {
						return (
							<MainArticle
								key={item.id}
								title={item.title}
								image={item.image}
								description={item.description}
								source={
									articles.sources.find(
										(source) => source.id === item.source_id
									).name
								}
								category={
									articles.categories.find(
										(catId) => catId.id === item.category_id
									).name
								}
							/>
						);
					})}
				</section>
				<aside>
					<ul className="flex flex-col gap-[35px]">
						{articles.items.slice(3, 12).map((item) => {
							return (
								<SecondArticle
									key={item.id}
									title={item.title}
									date={item.date}
									source={
										articles.sources.find(
											(source) => source.id === item.source_id
										).name
									}
								/>
							);
						})}
					</ul>
				</aside>
			</main>

			<footer className="relative text-white before:bg-dark before:w-[100vw] before:absolute before:top-[0] before:bottom-[0] before:right-[0] before:left-[calc((-100vw+100%)/2)] before:-z-10">
				<Navigation
					onNavClick={onNavClick}
					currentCategory={categoryName}
				/>
				<div className="flex mt-12">
					<div className="mr-auto">
						Сделано на Frontend курсе в
						<a
							className="text-orange inline-block underline"
							href="#"
						>
							Karpov.Courses
						</a>
					</div>
					<span className="">© 2021</span>
				</div>
			</footer>
		</div>
	);
}
