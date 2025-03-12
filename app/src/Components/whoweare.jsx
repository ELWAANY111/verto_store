import React from "react";

const WhoWeAre = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">من نحن</h2>
      <p className="text-lg text-gray-700 mb-6">
        نحن علامة تجارية متخصصة في تقديم مجموعة متنوعة من الملابس الحديثة والأنيقة للرجال والشباب. 
        نحن نفهم أهمية الراحة والأناقة في كل قطعة من ملابسنا، ولهذا السبب نقدم منتجات تجمع بين الجودة العالية والتصميم العصري.
        سواء كنت تبحث عن ملابس كاجوال للاستخدام اليومي أو ملابس رسمية للمناسبات الخاصة، لدينا ما يلبي احتياجاتك.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="border rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">رؤيتنا</h3>
          <p className="text-gray-600">
            هدفنا هو تقديم أفضل تجربة تسوق لعملائنا من خلال توفير ملابس عصرية ذات جودة عالية. 
            نعمل دائمًا على تلبية تطلعات عملائنا في الموضة والراحة.
          </p>
        </div>

        <div className="border rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">مهمتنا</h3>
          <p className="text-gray-600">
            مهمتنا هي أن نقدم لكم أفضل أنواع الملابس التي تعكس أسلوبكم الشخصي وتلبي احتياجاتكم العملية. 
            نهدف إلى أن نكون جزءًا من إطلالاتكم اليومية عبر تصاميم مميزة وأقمشة مريحة.
          </p>
        </div>

        <div className="border rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-2">قيمنا</h3>
          <p className="text-gray-600">
            نحن نؤمن بالجودة، الأصالة، والابتكار. قيمنا هي ما يدفعنا لتقديم ملابس تتسم بالموضة والراحة في 
            آنٍ واحد. نحن نعمل على تقديم كل ما هو جديد لتلبية رغباتكم وتوقعاتكم.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
