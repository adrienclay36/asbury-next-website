import React from 'react'
import NewsItem from './news-item'
const NewsArticleList = () => {
  return (
      <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 container gap-12 mb-12">
    {
        newsInfo.map((newsItem) => (
            <NewsItem key={newsItem.title} title={newsItem.title} author={newsItem.author} image={newsItem.image} authorImage={newsItem.authorImage}
            previewText={newsItem.previewText} date={newsItem.date} href={newsItem.href}/>
        ))
    }
    </div>
  )
}

export default NewsArticleList

export const newsInfo = [
  {
    title: "Asbury Cafe donates $52K to 12 charities",
    author: "ABQJournal News Staff",
    date: "10/20/2016",
    image:
      "https://d21yqjvcoayho7.cloudfront.net/wp-content/uploads/2016/10/20/c02_jd_21oct_assbury-e1477029509814-400x366.jpg",
    authorImage:
      "https://www.abqjournal.com/wp-content/themes/abq/assets/images/header_logo.svg",
    previewText:
      "A dozen local charities were the beneficiaries of a $52,000 profit made by the Asbury Cafe during this year’s New Mexico State Fair...",
    href: "https://www.abqjournal.com/872061/asbury-cafe-donates-52k-to-12-charities.html",
  },
  {
    title: "Asbury Cafe Raises $45K",
    author: "ABQJournal News Staff",
    date: "10/5/2012",
    image: "/images/pie-cafe.jpg",
    authorImage:
      "https://www.abqjournal.com/wp-content/themes/abq/assets/images/header_logo.svg",
    previewText:
      "The institution that has been Asbury Pie Cafe at the State Fair for the last five decades delivered another tasty fund-raising effort....",
    href: "https://www.abqjournal.com/136100/asbury-cafe-raises-45k.html",
  },
  {
    title: "Asbury Cafe celebrates 50 years of fair pie sales",
    author: "ABQJournal News Staff",
    date: "9/10/2010",
    image: "https://i.prcdn.co/img?regionKey=oAFXBTONDnwVzHMVQusvrA%3d%3d",
    authorImage:
      "https://www.abqjournal.com/wp-content/themes/abq/assets/images/header_logo.svg",
    previewText:
      "When the Asbury Cafe first opened its doors at the New Mexico State Fair, it sat inside the Goat Barn and sold homemade pies to raise money for Asbury United Methodist Church’s building fund. About $471 was brought in.",
    href: "https://www.pressreader.com/usa/albuquerque-journal/20100910/282467115217670",
  },
];