import fetch from "node-fetch";

const HF_API_KEY = "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";

export default async function handler(req, res) {
  const { answers } = req.body;

  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: `
      المستخدم يريد خطة تعلم:
      - الموضوع: ${answers.topic}
      - المستوى: ${answers.level}
      - الطريقة المفضلة: ${answers.style}
      - الوقت المتاح أسبوعياً: ${answers.time} ساعة
      أنشئ له خطة تعليمية منظمة مع مصادر مناسبة.
      `
    })
  });

  const data = await response.json();
  res.status(200).json({ plan: data[0]?.generated_text || "⚠️ لم أتمكن من توليد الخطة." });
}
