// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Chatbot Response
function askChatbot() {
    const userInput = document.getElementById("chatInput").value.trim();
    const chatResponseDiv = document.getElementById("chatResponse");

    if (userInput) {
        chatResponseDiv.classList.remove("hidden");
        chatResponseDiv.innerHTML = generateChatbotResponse(userInput);
    } else {
        chatResponseDiv.classList.add("hidden");
    }
}

function generateChatbotResponse(input) {
    const responses = {
        "mental health": "Mental health is essential. It’s okay to ask for help, and there are plenty of resources available to support you.",
        "stress": "It’s normal to feel stressed, but try taking a few deep breaths or taking a break. You got this!",
        "coping strategies": "Some strategies for coping include regular physical exercise, staying connected with loved ones, and practicing mindfulness.",
        "help": "If you need immediate help, please contact a mental health professional or helpline."
    };

    return responses[input.toLowerCase()] || "I'm here to help, feel free to ask me anything!";
}

// Form Validation and Handling
document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    const formData = {
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        previousIssues: document.getElementById("previousIssues").value,
        familyHistory: document.getElementById("familyHistory").value,
        employmentStatus: document.getElementById("employmentStatus").value,
        socialSupport: document.getElementById("socialSupport").value,
        recentLifeEvents: document.getElementById("recentLifeEvents").value,
        exerciseFrequency: document.getElementById("exerciseFrequency").value,
        eatingHabits: document.getElementById("eatingHabits").value,
        mood: document.getElementById("mood").value.trim().toLowerCase(),
        sleep: document.getElementById("sleep").value,
        stressLevel: document.getElementById("stressLevel").value
    };

    if (Object.values(formData).some(field => !field)) {
        alert("Please fill out all fields.");
        return;
    }

    const isPositiveMood = formData.mood.includes("happy") || formData.mood.includes("content") || formData.mood.includes("calm");

    document.getElementById("loading").classList.remove("hidden");

    setTimeout(function() {
        document.getElementById("loading").classList.add("hidden");

        const solutions = generateSolutions(formData, isPositiveMood);
        const copingStrategies = generateCopingStrategies(formData, isPositiveMood);

        document.getElementById("solutions").innerHTML = solutions;
        document.getElementById("copingStrategies").innerHTML = copingStrategies;

        if (isPositiveMood) {
            document.getElementById("solutions").innerHTML = "<p> It seems you're in a good mood. Keep up the positive mindset! Ensure you continue with activities that bring you joy and maintain your balanced lifestyle. Remember, keeping up with regular physical activity, eating healthy, and getting enough sleep will help keep your mental well-being strong.</p>";
            document.getElementById("copingStrategies").innerHTML = "";
        }

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("resources").classList.remove("hidden");

        window.scrollTo({
            top: document.getElementById("result").offsetTop,
            behavior: "smooth"
        });
    }, 2000);
});

function generateSolutions(data, isPositiveMood) {
    if (isPositiveMood) return "";

    let solutions = "";

    if (data.mood.includes("sad") || data.mood.includes("anxious") || data.mood.includes("stressed")) {
        solutions += "<p><strong>Suggestion:</strong> Try mindfulness techniques such as deep breathing exercises, yoga, or journaling to manage stress.</p>";
    }
    if (data.sleep < 6) {
        solutions += "<p><strong>Suggestion:</strong> Aim for 7-9 hours of sleep each night. Consider establishing a bedtime routine for relaxation.</p>";
    }
    if (data.stressLevel >= 7) {
        solutions += "<p><strong>Suggestion:</strong> Explore techniques like progressive muscle relaxation or self-compassion to cope with high stress.</p>";
    }
    if (data.exerciseFrequency === "Never") {
        solutions += "<p><strong>Suggestion:</strong> Try incorporating daily physical activities like walking, dancing, or even stretching to improve mental health.</p>";
    }
    if (data.eatingHabits === "Unhealthy") {
        solutions += "<p><strong>Suggestion:</strong> Improve your diet by adding more whole foods, fruits, vegetables, and drinking plenty of water.</p>";
    }
    if (data.socialSupport === "No") {
        solutions += "<p><strong>Suggestion:</strong> Try joining a support group, reaching out to friends, or participating in community events to build a stronger social network.</p>";
    }
    if (data.recentLifeEvents === "Yes") {
        solutions += "<p><strong>Suggestion:</strong> Consider speaking to a therapist or counselor to help process any difficult life events.</p>";
    }
    if (data.previousIssues === "Yes" || data.familyHistory === "Yes") {
        solutions += "<p><strong>Suggestion:</strong> Consider seeking professional mental health support or therapy if you have experienced mental health issues in the past.</p>";
    }
    if (data.stressLevel >= 8 || data.mood.includes("suicidal") || data.mood.includes("overwhelmed")) {
        solutions += "<p><strong>Important:</strong> Please seek professional help immediately. Contact a therapist or counselor, or visit <a href='https://icallhelpline.org/' target='_blank'>this counselor's page</a> for assistance.</p>";
    }

    solutions += "<p>It's crucial to reach out for professional support if you're feeling overwhelmed. These suggestions are general and not a substitute for professional care.</p>";
    return solutions;
}

function generateCopingStrategies(data, isPositiveMood) {
    if (isPositiveMood) return "";

    let strategies = "";

    if (data.stressLevel >= 8) {
        strategies += "<p><strong>Strategy:</strong> Try grounding techniques like focusing on your breath or mindfulness exercises to cope with high stress.</p>";
    }
    if (data.exerciseFrequency === "Never") {
        strategies += "<p><strong>Strategy:</strong> Try light physical activities, like walking or yoga, to relieve stress and boost endorphins.</p>";
    }
    if (data.mood.includes("sad") || data.mood.includes("anxious")) {
        strategies += "<p><strong>Strategy:</strong> Consider reaching out to a friend or therapist to talk through your feelings. Social connection can help.</p>";
    }
    if (data.sleep < 6) {
        strategies += "<p><strong>Strategy:</strong> Try a sleep routine, including winding down an hour before bed with activities like reading or listening to calming music.</p>";
    }
    if (data.eatingHabits === "Unhealthy") {
        strategies += "<p><strong>Strategy:</strong> Start with small dietary changes. Try including nutrient-dense foods like vegetables, nuts, and seeds into your meals.</p>";
    }
    if (data.recentLifeEvents === "Yes") {
        strategies += "<p><strong>Strategy:</strong> Write in a journal, practice self-care, and talk to someone about how you're feeling. Processing emotions is key to recovery.</p>";
    }

    return strategies;
}

// Reset Form
function resetForm() {
    document.getElementById("predictionForm").reset();
    document.getElementById("result").classList.add("hidden");
    document.getElementById("resources").classList.add("hidden");
    document.getElementById("solutions").innerHTML = "";
    document.getElementById("copingStrategies").innerHTML = "";
    document.getElementById("chatResponse").classList.add("hidden");
    document.getElementById("chatInput").value = "";
    document.getElementById("progress").style.width = "0%"; // Reset progress bar
}

// Progress Bar
const formInputs = document.querySelectorAll("input, select, textarea");
formInputs.forEach(input => {
    input.addEventListener("input", updateProgressBar);
});

function updateProgressBar() {
    const filledInputs = Array.from(formInputs).filter(input => input.value);
    const progressPercentage = (filledInputs.length / formInputs.length) * 100;
    document.getElementById("progress").style.width = progressPercentage + "%";
}


























