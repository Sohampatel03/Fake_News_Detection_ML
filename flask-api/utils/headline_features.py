import re

SENSATIONAL_WORDS = [

# sensational / clickbait
"shocking","bombshell","explosive","exposed","secret",
"unbelievable","must read","you wont believe","what happened next",
"this will blow your mind","the truth about","they dont want you to know",
"breaking","urgent","exclusive","leaked","revealed",

# conspiracy / misinformation
"hoax","cover up","hidden truth","media hiding","mainstream media",
"fake media","deep state","propaganda","false flag","inside job",
"secret plan","government hiding","censored","banned news",

# miracle / cure
"miracle","magic cure","instant cure","secret cure",
"ancient remedy","natural cure","doctors hate this",
"one simple trick","guaranteed cure",

# fear / panic
"alert","danger","threat","warning","panic",
"crisis","disaster","catastrophe","devastating",
"apocalypse","deadly","killer virus",

# politics / manipulation
"rigged","stolen election","fraud","corruption scandal",
"massive corruption","illegal scheme","scandal exposed",

# exaggerated social claims
"everyone is talking about","viral truth","share before deleted",
"watch before its removed","must watch","spread this",
"wake up","wake up people","truth finally exposed",

# health misinformation
"big pharma secret","vaccine truth","vaccine hoax",
"medical conspiracy","doctors lying","hidden cure",

# money scams
"get rich quick","instant wealth","millionaire secret",
"secret investment","guaranteed profit",

]

ALL_CAPS_PATTERN = re.compile(r'\b[A-Z]{4,}\b')

CLICKBAIT_PATTERN = re.compile(
r'(you wont believe|what happened next|this is why|the truth about|watch before its removed|share before deleted)',
re.IGNORECASE
)

EXCESSIVE_PUNCT = re.compile(r'[!?]{2,}')

def sensationalism_score(text):

    score = 0
    text_lower = text.lower()

    for word in SENSATIONAL_WORDS:
        if word in text_lower:
            score += 0.12   # slightly reduced weight to avoid overfitting

    caps_matches = ALL_CAPS_PATTERN.findall(text)
    score += len(caps_matches) * 0.08

    if CLICKBAIT_PATTERN.search(text):
        score += 0.18

    if EXCESSIVE_PUNCT.search(text):
        score += 0.12

    return min(score,1.0)