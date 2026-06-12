export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    mode: "read-only",
    updatedAt: new Date().toISOString(),
    chatbot: {
      conversations: { value: "Awaiting chatbot event log", trend: [14,22,31,40,58,73,88] },
      unresolvedQuestions: { value: "Prepared", trend: [20,18,16,12,10,8,5] },
      typoIntelligence: { value: "Prepared", trend: [16,25,37,44,60,77,89] },
      recommendations: { value: "Prepared", trend: [10,24,35,49,63,78,90] }
    },
    accessibility: {
      textSize: "Prepared",
      contrast: "Prepared",
      captions: "Prepared",
      reducedMotion: "Prepared",
      readAloud: "Prepared",
      caregiverSupport: "Prepared"
    },
    language: {
      preferredLanguage: "Prepared",
      dialect: "Prepared",
      locality: "Prepared",
      nativeExperience: true
    },
    protectedSystems: {
      consentAware: true,
      noSensitiveInferenceWithoutConsent: true
    }
  });
}
