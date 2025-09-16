// index.js

function $(selector) { return document.querySelector(selector); }
function $all(selector) { return document.querySelectorAll(selector); }

const questions = [
  {
    key: "topic",
    label: "🧑‍💻 ماذا تريد أن تتعلم؟",
    options: ["HTML", "CSS", "JavaScript", "Python", "AI", "Other"]
  },
  {
    key: "level",
    label: "📊 ما هو مستواك الحالي؟",
    options: ["Beginner", "Intermediate", "Advanced"]
  },
  {
    key: "style",
    label: "📚 تفضل التعلم كيف؟",
    options: ["نظري", "عملي", "فيديوهات", "مقالات"]
  },
  {
    key: "time",
    label: "⏳ كم ساعة تستطيع أن تتعلم أسبوعياً؟",
    options: ["1-3", "4-6", "7-10", "10+"]
  }
];

let step = 0;
let answers = {};

function showQuestion() {
  const question = questions[step];
  let html = `<h2>${question.label}</h2><div class="options">`;

  question.options.forEach(opt => {
    html += `
      <label class="option">
        <input type="radio" name="answer" value="${opt}"/>
        ${opt}
      </label>
    `;
  });

  html += `</div>
    <button id="next">${step === questions.length - 1 ? "إنشاء الخطة" : "التالي"}</button>
  `;

  $("#app").innerHTML = `<div class="question-box">${html}</div>`;

  $("#next").onclick = nextStep;
}

async function nextStep() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("يرجى اختيار إجابة قبل المتابعة");
    return;
  }

  answers[questions[step].key] = selected.value;

  if (step < questions.length - 1) {
    step++;
    showQuestion();
  } else {
    $("#app").innerHTML = "<p>⏳ جاري إنشاء الخطة...</p>";
    try {
      const plan = await generatePlan(answers);
      $("#app").innerHTML = `
        <div class="plan-box">
          <h2>📅 خطة التعلم الخاصة بك</h2>
          <pre>${plan.plan}</pre>
        </div>
      `;
    } catch (err) {
      console.error(err);
      $("#app").innerHTML = "<p>❌ حدث خطأ أثناء توليد الخطة</p>";
    }
  }
}

// بدء التنفيذ
showQuestion();
