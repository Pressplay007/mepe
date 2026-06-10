interface ArticleContentProps {
  content: string;
  className?: string;
}

const articleProse =
  "article-content font-body text-mda-maroon/80 leading-relaxed " +
  "[&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-6 " +
  "[&_h2]:text-2xl [&_h2]:font-display [&_h2]:text-mda-maroon [&_h2]:mt-8 [&_h2]:mb-4 " +
  "[&_h3]:text-xl [&_h3]:font-display [&_h3]:text-mda-maroon [&_h3]:mt-6 [&_h3]:mb-3 " +
  "[&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-mda-pink [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-mda-maroon/70 [&_blockquote]:my-6 " +
  "[&_a]:text-mda-pink [&_a]:underline [&_hr]:my-8 [&_hr]:border-mda-maroon/10 " +
  "[&_strong]:font-bold [&_em]:italic";

const ArticleContent = ({ content, className = "" }: ArticleContentProps) => {
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(content);

  if (looksLikeHtml) {
    return (
      <div
        className={`${articleProse} ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div
      className={`font-body text-mda-maroon/80 whitespace-pre-wrap leading-relaxed ${className}`}
    >
      {content}
    </div>
  );
};

export default ArticleContent;
