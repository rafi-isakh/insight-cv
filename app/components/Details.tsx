import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent
} from './Accordion';

// Utility function for class merging
const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs));
};

// Helper component: ScoreBadge
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge color based on score
  const getBadgeStyles = () => {
    if (score > 69) {
      return {
        bg: 'bg-green-100',
        text: 'text-green-600',
        icon: (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      };
    } else if (score > 39) {
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-600',
        icon: null
      };
    } else {
      return {
        bg: 'bg-red-100',
        text: 'text-red-600',
        icon: null
      };
    }
  };

  const { bg, text, icon } = getBadgeStyles();

  return (
    <div className={cn('rounded-full px-3 py-1 flex items-center', bg)}>
      {icon}
      <span className={cn('text-xs font-medium', text)}>{score}/100</span>
    </div>
  );
};

// Helper component: CategoryHeader
interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, categoryScore }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-base font-medium text-gray-800">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// Helper component: CategoryContent
interface CategoryContentProps {
  tips: {
    type: "good" | "improve";
    tip: string;
    explanation: string;
  }[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="space-y-4">
      {/* Two-column grid for tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-2">
            {tip.type === "good" ? (
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="flex-shrink-0 w-5 h-5 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            )}
            <span className="text-sm">{tip.tip}</span>
          </div>
        ))}
      </div>

      {/* Explanation boxes */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={`explanation-${index}`} 
            className={cn(
              'p-3 rounded-md text-sm',
              tip.type === "good" 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-yellow-50 border border-yellow-100'
            )}
          >
            <p className="font-medium mb-1">
              {tip.type === "good" ? "What's working well:" : "How to improve:"}
            </p>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Details component
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="w-full">
      <Accordion className="w-full" defaultOpen="tone-style">
        <AccordionItem id="tone-style" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader 
              title="Tone & Style" 
              categoryScore={feedback.toneAndStyle.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="content">
            <CategoryHeader 
              title="Content" 
              categoryScore={feedback.content.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure" className="rounded-md border border-gray-200 mb-3">
          <AccordionHeader itemId="structure">
            <CategoryHeader 
              title="Structure" 
              categoryScore={feedback.structure.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills" className="rounded-md border border-gray-200">
          <AccordionHeader itemId="skills">
            <CategoryHeader 
              title="Skills" 
              categoryScore={feedback.skills.score} 
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
