import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function ArticleCard({ category, title, excerpt, readTime, date, to = "#" }) {
  return (
    <Link to={to} className="block group h-full">
      <Card className="h-full p-6 flex flex-col hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="primary">{category}</Badge>
          <span className="text-xs text-text-secondary">{readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-text-secondary text-sm flex-grow mb-6">
          {excerpt}
        </p>
        
        <div className="text-xs text-text-secondary mt-auto font-medium">
          {date}
        </div>
      </Card>
    </Link>
  );
}
