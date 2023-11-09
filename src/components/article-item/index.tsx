import React from "react";
import { Link } from "gatsby";

interface Props {
  title: string;
  summary: string;
  cover: string;
  create_time: string;
  category: string;
  slug: string;
}

const ArticleItem: React.FC<Props> = (props) => {
  return (
    <div className="w-full h-60 flex items-center py-8 border-t border-secondary">
      <div className="h-full flex-grow mr-8">
        <div className="flex items-center text-xs">
          <Link
            to={`/article/${props.slug}`}
            className=" font-bold bg-secondary h-7 flex items-center justify-center px-3 rounded"
          >
            {props.category}
          </Link>
          <span className=" h-7 flex items-center justify-center px-3 ml-3">
            {props.create_time}
          </span>
        </div>
        <Link
          to={`/article/${props.slug}`}
          className=" font-bold text-2xl mt-5 line-clamp-2"
        >
          {props.title}
        </Link>
        <p className=" mt-3 line-clamp-3">{props.summary}</p>
      </div>
      <Link
        to={`/article/${props.slug}`}
        className="block h-full aspect-video overflow-hidden rounded-lg flex-shrink-0 group"
      >
        <img
          src={props.cover}
          className="w-full h-full object-cover group-hover:scale-110 transition-all"
          alt="封面"
        />
      </Link>
    </div>
  );
};

export default ArticleItem;
