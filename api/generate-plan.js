import fetch from "node-fetch";

const HF_API_KEY = "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";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { answers } = req.body;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
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
      }
    );

    const text = await response.text(); // اقرأ النص مباشرة
    let output;

    try {
      const data = JSON.parse(text);
      output = data[0]?.generated_text || "⚠️ لم أتمكن من توليد الخطة.";
    } catch {
      output = text; // إذا لم يكن JSON صالح، أرسل النص كما هو
    }

    res.status(200).json({ plan: output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ plan: "❌ حصل خطأ أثناء توليد الخطة." });
  }
}

