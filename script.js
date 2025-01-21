


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
    event.preventDefault(); // Prevent form from submitting the traditional way

    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const previousIssues = document.getElementById("previousIssues").value;
    const familyHistory = document.getElementById("familyHistory").value;
    const employmentStatus = document.getElementById("employmentStatus").value;
    const socialSupport = document.getElementById("socialSupport").value;
    const recentLifeEvents = document.getElementById("recentLifeEvents").value;
    const exerciseFrequency = document.getElementById("exerciseFrequency").value;
    const eatingHabits = document.getElementById("eatingHabits").value;
    const mood = document.getElementById("mood").value.trim().toLowerCase();
    const sleep = document.getElementById("sleep").value;
    const stressLevel = document.getElementById("stressLevel").value;

    // Validate required fields
    if (!age || !gender || !previousIssues || !familyHistory || !employmentStatus || !socialSupport || !recentLifeEvents || !exerciseFrequency || !eatingHabits || !mood || !sleep || !stressLevel) {
        alert("Please fill out all fields.");
        return;
    }

    // Check if the mood is positive
    let isPositiveMood = mood.includes("happy") || mood.includes("content") || mood.includes("calm");

    // Show the loading text
    document.getElementById("loading").classList.remove("hidden");

    // Simulate result processing
    setTimeout(function() {
        // Hide loading text
        document.getElementById("loading").classList.add("hidden");

        // Generate solutions and coping strategies
        let solutions = generateSolutions(age, gender, previousIssues, familyHistory, employmentStatus, socialSupport, 
                                           recentLifeEvents, exerciseFrequency, eatingHabits, mood, sleep, stressLevel, isPositiveMood);
        
        let copingStrategies = generateCopingStrategies(age, gender, previousIssues, familyHistory, employmentStatus, socialSupport, 
                                                        recentLifeEvents, exerciseFrequency, eatingHabits, mood, sleep, stressLevel, isPositiveMood);

        // Display results based on inputs
        document.getElementById("solutions").innerHTML = solutions;
        document.getElementById("copingStrategies").innerHTML = copingStrategies;

        // If mood is positive, show a positive message and hide suggestions/coping strategies
        if (isPositiveMood) {
            document.getElementById("result").classList.remove("hidden");
            document.getElementById("resources").classList.remove("hidden");
            document.getElementById("solutions").innerHTML = "<p> It seems you're in a good mood. Keep up the positive mindset! Ensure you continue with activities that bring you joy and maintain your balanced lifestyle. Remember, keeping up with regular physical activity, eating healthy, and getting enough sleep will help keep your mental well-being strong.</p>";
            document.getElementById("copingStrategies").innerHTML = "";  // Hide coping strategies
        } else {
            document.getElementById("result").classList.remove("hidden");
            document.getElementById("resources").classList.remove("hidden");
        }

        window.scrollTo({
            top: document.getElementById("result").offsetTop,
            behavior: "smooth"
        });

    }, 2000); // Simulate a delay in result processing
});

// Generate Solutions Based on Inputs
function generateSolutions(age, gender, previousIssues, familyHistory, employmentStatus, socialSupport, 
                           recentLifeEvents, exerciseFrequency, eatingHabits, mood, sleep, stressLevel, isPositiveMood) {
    let solutions = "";

    if (isPositiveMood) {
        return solutions; // Skip suggestions for positive mood
    }

    if (mood.includes("sad") || mood.includes("anxious") || mood.includes("stressed")) {
        solutions += "<p><strong>Suggestion:</strong> Try mindfulness techniques such as deep breathing exercises, yoga, or journaling to manage stress.</p>";
    }
    if (sleep < 6) {
        solutions += "<p><strong>Suggestion:</strong> Aim for 7-9 hours of sleep each night. Consider establishing a bedtime routine for relaxation.</p>";
    }
    if (stressLevel >= 7) {
        solutions += "<p><strong>Suggestion:</strong> Explore techniques like progressive muscle relaxation or self-compassion to cope with high stress.</p>";
    }
    if (exerciseFrequency === "Never") {
        solutions += "<p><strong>Suggestion:</strong> Try incorporating daily physical activities like walking, dancing, or even stretching to improve mental health.</p>";
    }
    if (eatingHabits === "Unhealthy") {
        solutions += "<p><strong>Suggestion:</strong> Improve your diet by adding more whole foods, fruits, vegetables, and drinking plenty of water.</p>";
    }
    if (socialSupport === "No") {
        solutions += "<p><strong>Suggestion:</strong> Try joining a support group, reaching out to friends, or participating in community events to build a stronger social network.</p>";
    }
    if (recentLifeEvents === "Yes") {
        solutions += "<p><strong>Suggestion:</strong> Consider speaking to a therapist or counselor to help process any difficult life events.</p>";
    }
    if (previousIssues === "Yes" || familyHistory === "Yes") {
        solutions += "<p><strong>Suggestion:</strong> Consider seeking professional mental health support or therapy if you have experienced mental health issues in the past.</p>";
    }
    if (stressLevel >= 8 || mood.includes("suicidal") || mood.includes("overwhelmed")) {
        solutions += "<p><strong>Important:</strong> Please seek professional help immediately. Contact a therapist or counselor, or visit <a href='https://icallhelpline.org/' target='_blank'>this counselor's page</a> for assistance.</p>";
    }

    solutions += "<p>It's crucial to reach out for professional support if you're feeling overwhelmed. These suggestions are general and not a substitute for professional care.</p>";
    return solutions;
}

// Generate Coping Strategies Based on Inputs
function generateCopingStrategies(age, gender, previousIssues, familyHistory, employmentStatus, socialSupport, 
                                 recentLifeEvents, exerciseFrequency, eatingHabits, mood, sleep, stressLevel, isPositiveMood) {
    let strategies = "";

    if (isPositiveMood) {
        return strategies; // Skip coping strategies for positive mood
    }

    if (stressLevel >= 8) {
        strategies += "<p><strong>Strategy:</strong> Try grounding techniques like focusing on your breath or mindfulness exercises to cope with high stress.</p>";
    }
    if (exerciseFrequency === "Never") {
        strategies += "<p><strong>Strategy:</strong> Try light physical activities, like walking or yoga, to relieve stress and boost endorphins.</p>";
    }
    if (mood.includes("sad") || mood.includes("anxious")) {
        strategies += "<p><strong>Strategy:</strong> Consider reaching out to a friend or therapist to talk through your feelings. Social connection can help.</p>";
    }
    if (sleep < 6) {
        strategies += "<p><strong>Strategy:</strong> Try a sleep routine, including winding down an hour before bed with activities like reading or listening to calming music.</p>";
    }
    if (eatingHabits === "Unhealthy") {
        strategies += "<p><strong>Strategy:</strong> Start with small dietary changes. Try including nutrient-dense foods like vegetables, nuts, and seeds into your meals.</p>";
    }
    if (recentLifeEvents === "Yes") {
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

// Progress Bar (optional, can be used to track form completion)
const formInputs = document.querySelectorAll("input, select, textarea");
formInputs.forEach(input => {
    input.addEventListener("input", updateProgressBar);
});

function updateProgressBar() {
    const filledInputs = Array.from(formInputs).filter(input => input.value);
    const progressPercentage = (filledInputs.length / formInputs.length) * 100;
    document.getElementById("progress").style.width = progressPercentage + "%";
}










// script.js
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});
