import { HANDLE_SET_NEW_LESSONPLAN } from "../types";

const initialState = {
  unit: null,
  unitPlanId: null,
  subject: null,
  keyUnitCompetency: null,
  lessonNumber: 0,
  lessonName: null,
  knowledge: {
    topics: [],
    instructionalMaterial: [],
    otherMaterialsAndReferences: null,
  },
  skills: {
    topics: [
      {
        topic: null,
        bloomTaxonomy: null,
        standardCriteriaPerfomance: 0,
      },
    ],
    instructionalMaterial: [
      {
        materialType: null,
        items: [
          {
            item: null,
          },
        ],
        uploads: [{ file1: null }],
      },
    ],
    otherMaterialsAndReferences: null,
  },
  attitudesAndValues: {
    topics: [
      {
        topic: null,
        bloomTaxonomy: null,
        standardCriteriaPerfomance: 80,
      },
    ],
    instructionalMaterial: [
      {
        materialType: null,
        items: [
          {
            item: null,
          },
        ],
        uploads: [{ file1: null }],
      },
    ],
    otherMaterialsAndReferences: null,
  },

  activities: {
    introduction: {
      content: {
        activities: [
          {
            activity: null,
          },
        ],
        otherActivity: "",
      },
      crossCuttingIssues: {
        issues: [
          {
            issue: null,
          },
        ],
        omment: null,
      },
      competency: {
        competencies: [
          {
            competency: null,
          },
        ],
        comment: null,
      },
    },
    development: {
      content: {
        activities: [
          {
            activity: null,
          },
        ],
        otherActivity: "",
      },
      crossCuttingIssues: {
        issues: [
          {
            issue: null,
          },
        ],
        omment: null,
      },
      competency: {
        competencies: [
          {
            competency: null,
          },
        ],
        comment: null,
      },
    },
    conclusion: {
      content: {
        activities: [
          {
            activity: null,
          },
        ],
        otherActivity: "",
      },
      crossCuttingIssues: {
        issues: [
          {
            issue: null,
          },
        ],
        omment: null,
      },
      competency: {
        competencies: [
          {
            competency: null,
          },
        ],
        comment: null,
      },
    },

    exercises: {
      questions: [
        {
          difficultLevel: "MEDIUM",
          questionsObjective: "REMEMBERING",
          question: "What is the answer",
          questionType: "MULTI-CHOICE",
          possibleAnswer: [
            {
              answer: "answer",
            },
            {
              answer: "answer2",
            },
            {
              answer: "answer3",
            },
          ],
          answers: [
            {
              answer: "answer2",
            },
            {
              answer: "answer3",
            },
          ],
          points: 10,
        },
      ],
    },
  },
  teachingTechniques: {
    introduction: {
      contentFocus: [
        {
          item: "LIVE-LECTURING",
        },
      ],
      interactiveFocus: [
        {
          item: "GROUP-WORK",
        },
      ],
      criticalThinking: [
        {
          item: "CLASS-DISCUSSIONS-DEBATES",
        },
      ],
      production: [
        {
          item: "SKILLS-PRACTICE",
        },
      ],
      problemSolving: [
        {
          item: "RESEARCH-INQUIRY",
        },
      ],
      reflection: [
        {
          item: "REFLECTION-ON-LEARNING",
        },
      ],
      sitingArrangement: [
        {
          item: "LECTURE/INDEPENDENT-WORK/TEST",
        },
      ],
      duration: 10,
    },
    development: {
      contentFocus: [
        {
          item: "LIVE-LECTURING",
        },
      ],
      interactiveFocus: [
        {
          item: "GROUP-WORK",
        },
      ],
      criticalThinking: [
        {
          item: "CLASS-DISCUSSIONS-DEBATES",
        },
      ],
      production: [
        {
          item: "SKILLS-PRACTICE",
        },
      ],
      problemSolving: [
        {
          item: "RESEARCH-INQUIRY",
        },
      ],
      reflection: [
        {
          item: "REFLECTION-ON-LEARNING",
        },
      ],
      sitingArrangement: [
        {
          item: "LECTURE/INDEPENDENT-WORK/TEST",
        },
      ],
      duration: 10,
    },
    conclusion: {
      contentFocus: [
        {
          item: "LIVE-LECTURING",
        },
      ],
      interactiveFocus: [
        {
          item: "GROUP-WORK",
        },
      ],
      criticalThinking: [
        {
          item: "CLASS-DISCUSSIONS-DEBATES",
        },
      ],
      production: [
        {
          item: "SKILLS-PRACTICE",
        },
      ],
      problemSolving: [
        {
          item: "RESEARCH-INQUIRY",
        },
      ],
      reflection: [
        {
          item: "REFLECTION-ON-LEARNING",
        },
      ],
      sitingArrangement: [
        {
          item: "LECTURE/INDEPENDENT-WORK/TEST",
        },
      ],
      duration: 10,
    },
  },
  time: {
    day: new Date(),
    slotOnTimetable: "603159c6191af33cdc989ff0",
  },
};

const newLessonPlanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_SET_NEW_LESSONPLAN:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default newLessonPlanReducer;
