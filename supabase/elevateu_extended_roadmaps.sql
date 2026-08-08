-- ============================================================
-- ElevateU — Extended Roadmaps Seed (roadmap.sh categories)
-- Paste into Supabase SQL Editor and run
-- ============================================================

-- ── AI and Data Scientist ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('d8935a2c-18eb-448d-9702-cc7d84fbbd62', 'ai-data-scientist', 'AI and Data Scientist', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('dc375ec9-6d20-428e-9b75-0a3f8192de22', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Mathematics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('018cc770-5c51-4287-8db9-8f37bbcaaee2', 'dc375ec9-6d20-428e-9b75-0a3f8192de22', 'Linear Algebra', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2485685b-e5c4-4e5f-be5b-60cc088d3b16', 'dc375ec9-6d20-428e-9b75-0a3f8192de22', 'Calculus & Optimization', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('02d2df4c-7b36-48e5-933b-34a72bae41f5', 'dc375ec9-6d20-428e-9b75-0a3f8192de22', 'Probability Theory', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7f5de666-6002-4ea0-abeb-4a767738c5f6', 'dc375ec9-6d20-428e-9b75-0a3f8192de22', 'Statistics', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6e4e0883-e658-4b25-a50c-292252529be8', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Python & R', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('57c72c10-c04f-4b84-9679-9efb74d85976', '6e4e0883-e658-4b25-a50c-292252529be8', 'Python Basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('59d764b3-8c72-439c-af29-193c788dc07b', '6e4e0883-e658-4b25-a50c-292252529be8', 'Pandas & NumPy', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('97770c63-085b-4259-a4f1-dddb64fb7ad4', '6e4e0883-e658-4b25-a50c-292252529be8', 'R for Statistics', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('ed6ec055-bcd0-47cf-a7eb-7ad7ce5bdf1d', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Machine Learning', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4242b1fc-96f7-4586-b82b-4f18ecbbbdd7', 'ed6ec055-bcd0-47cf-a7eb-7ad7ce5bdf1d', 'Regression', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4e5e6cb6-7898-411c-9f56-013c4e1abe1d', 'ed6ec055-bcd0-47cf-a7eb-7ad7ce5bdf1d', 'Classification', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('20000a38-0dd6-49f9-8a15-c3c27f459de6', 'ed6ec055-bcd0-47cf-a7eb-7ad7ce5bdf1d', 'Clustering', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('989955f6-bd96-49c3-88d8-44ab18c19907', 'ed6ec055-bcd0-47cf-a7eb-7ad7ce5bdf1d', 'Ensemble Methods', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('c652c75b-47b2-40c6-85d9-d203f8c22a26', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Deep Learning', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5dde3bb2-d486-4681-9d70-70e41b92566e', 'c652c75b-47b2-40c6-85d9-d203f8c22a26', 'TensorFlow / PyTorch', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f90433a8-7258-4ee8-a859-c6f2fd209328', 'c652c75b-47b2-40c6-85d9-d203f8c22a26', 'Computer Vision', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bb22ce26-6555-4bad-ab54-432c6f982ae9', 'c652c75b-47b2-40c6-85d9-d203f8c22a26', 'NLP', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6d015fc0-cf92-4056-8f96-13376e83286a', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Data Engineering', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a646ab49-508e-4ca6-b545-170117069506', '6d015fc0-cf92-4056-8f96-13376e83286a', 'Data Pipelines', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b5a2844c-ad79-4688-a616-11a2703d6d71', '6d015fc0-cf92-4056-8f96-13376e83286a', 'Feature Stores', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ef593315-672d-420e-8242-f358e11c7699', '6d015fc0-cf92-4056-8f96-13376e83286a', 'Data Lakes', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a859ce6f-a2ad-41d6-95e1-06ac799a712b', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Model Deployment', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9f709eda-b749-4360-b779-f328825620b2', 'a859ce6f-a2ad-41d6-95e1-06ac799a712b', 'Flask / FastAPI for ML', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c5f37a4a-621a-44d5-a92c-afe3af048ee3', 'a859ce6f-a2ad-41d6-95e1-06ac799a712b', 'Docker for Models', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ff6d35f2-f3fc-4c16-887a-37b2781803c6', 'a859ce6f-a2ad-41d6-95e1-06ac799a712b', 'MLflow', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('f1a939ed-6548-4d52-9645-d21d54ed4fe8', 'd8935a2c-18eb-448d-9702-cc7d84fbbd62', 'Experimentation', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bcc238de-46f6-41ba-8e93-151b5e70d413', 'f1a939ed-6548-4d52-9645-d21d54ed4fe8', 'A/B Testing', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('dea3bf60-20f6-426a-8d18-3aae94b2f6f4', 'f1a939ed-6548-4d52-9645-d21d54ed4fe8', 'Causal Inference', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3e8c70f8-5d4b-4de9-bde0-0f371fcaee22', 'f1a939ed-6548-4d52-9645-d21d54ed4fe8', 'Bayesian Experimentation', NULL, NULL, 2);

-- ── AI Engineer ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('444e36ca-b48c-4a1b-a13b-679803efd723', 'ai-engineer', 'AI Engineer', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('22768afa-c038-4520-92ef-186320f525e2', '444e36ca-b48c-4a1b-a13b-679803efd723', 'Mathematics for AI', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('623e1cb1-1649-4935-8a01-cce55a57fb97', '22768afa-c038-4520-92ef-186320f525e2', 'Linear Algebra', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('17b5fb0a-1194-4d55-b74d-d65486b12925', '22768afa-c038-4520-92ef-186320f525e2', 'Calculus', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('288ed4ad-d09d-4be1-92ca-c6142e5d47e0', '22768afa-c038-4520-92ef-186320f525e2', 'Probability & Statistics', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('28945e15-6707-49cc-b191-142d3a9a6cc6', '444e36ca-b48c-4a1b-a13b-679803efd723', 'Python for AI', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5eb5ffee-28d7-4774-8431-451c5a45f36e', '28945e15-6707-49cc-b191-142d3a9a6cc6', 'NumPy', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c0e2c445-e635-4dd2-98fc-a1029f0401e2', '28945e15-6707-49cc-b191-142d3a9a6cc6', 'Pandas', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e95b514c-adfe-4e98-a07c-413f33ac3b61', '28945e15-6707-49cc-b191-142d3a9a6cc6', 'Scikit-Learn', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('bd538b88-84cf-4b83-ba02-f7090bebb55b', '444e36ca-b48c-4a1b-a13b-679803efd723', 'Machine Learning', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8838c593-298f-4bce-839b-5c456694c79e', 'bd538b88-84cf-4b83-ba02-f7090bebb55b', 'Supervised Learning', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f51d87a3-e49f-47be-828b-c17c70ba3bd0', 'bd538b88-84cf-4b83-ba02-f7090bebb55b', 'Unsupervised Learning', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1f02174f-347a-4ac6-95bc-b913a597796d', 'bd538b88-84cf-4b83-ba02-f7090bebb55b', 'Model Evaluation', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bf12dc85-5994-4359-82b9-d453fdd1da5b', 'bd538b88-84cf-4b83-ba02-f7090bebb55b', 'Feature Engineering', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('31e6816b-1d8a-48c4-8e4e-c10da411a43f', '444e36ca-b48c-4a1b-a13b-679803efd723', 'Deep Learning', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('73600793-6f39-4db4-88e2-4b1030553ec9', '31e6816b-1d8a-48c4-8e4e-c10da411a43f', 'Neural Networks', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a1e48dc2-d9c6-4e62-8394-96afb97beadb', '31e6816b-1d8a-48c4-8e4e-c10da411a43f', 'CNNs', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('09daf963-a109-434c-be76-f6800f3bf282', '31e6816b-1d8a-48c4-8e4e-c10da411a43f', 'RNNs / LSTMs', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1f422aa4-eb8f-4f5d-aa2a-8af711d78403', '31e6816b-1d8a-48c4-8e4e-c10da411a43f', 'Transformers', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('e2f7bfb5-a9eb-4ddf-b5b5-b7371de05552', '444e36ca-b48c-4a1b-a13b-679803efd723', 'LLMs & Generative AI', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('19abb865-3a76-4699-8ed1-c257de884ce1', 'e2f7bfb5-a9eb-4ddf-b5b5-b7371de05552', 'Prompt Engineering', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6b5abbef-f9a0-454f-9b3f-84ab3661ff09', 'e2f7bfb5-a9eb-4ddf-b5b5-b7371de05552', 'Fine-tuning LLMs', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('68433033-ab6f-4a77-ad89-947d05b9c44e', 'e2f7bfb5-a9eb-4ddf-b5b5-b7371de05552', 'RAG (Retrieval Augmented Generation)', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('490d4afb-abc8-406a-aa0d-0f9b07a545b1', 'e2f7bfb5-a9eb-4ddf-b5b5-b7371de05552', 'LangChain / LlamaIndex', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('f22ce27e-d084-4dbd-8537-2701f2483302', '444e36ca-b48c-4a1b-a13b-679803efd723', 'MLOps', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5e1937ed-792f-46ee-a414-a6c8c0662dc4', 'f22ce27e-d084-4dbd-8537-2701f2483302', 'Model Serving', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fdc968c3-45ba-4172-a455-e94274c2d245', 'f22ce27e-d084-4dbd-8537-2701f2483302', 'ML Pipelines', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4e1b0ebb-0ed9-4ae2-97fe-e9fd391f323b', 'f22ce27e-d084-4dbd-8537-2701f2483302', 'Model Monitoring', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('919d99a7-06af-4486-b663-5fee859c1b2c', '444e36ca-b48c-4a1b-a13b-679803efd723', 'AI Ethics', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('580cec04-72ac-455f-bd00-13dbe5aa3b2b', '919d99a7-06af-4486-b663-5fee859c1b2c', 'Bias and Fairness', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('678c6d60-06fe-479b-a698-30e1d19910c6', '919d99a7-06af-4486-b663-5fee859c1b2c', 'Explainability', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b528d4b8-bdf2-4bf4-a0b5-998b6934d193', '919d99a7-06af-4486-b663-5fee859c1b2c', 'Responsible AI', NULL, NULL, 2);

-- ── Backend ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('dfef51d3-4f8b-4da6-806b-d16cf2702605', 'backend', 'Backend', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5e976861-2bdb-439a-b4a2-1a2f39762f1b', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Internet Basics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0379c33b-3921-4e4e-9f5b-74b843bb9fcb', '5e976861-2bdb-439a-b4a2-1a2f39762f1b', 'How does the internet work?', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('806876ca-35e2-4ac6-aaf6-0b6f2e2cee1d', '5e976861-2bdb-439a-b4a2-1a2f39762f1b', 'HTTP / HTTPS', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f72802eb-0604-492e-b518-129641a827e7', '5e976861-2bdb-439a-b4a2-1a2f39762f1b', 'APIs', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('43a48cbe-c613-44cc-9fba-b26a691b5140', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Pick a Language', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9ac4b9ea-8cb0-453e-98ec-384ad1a3ce52', '43a48cbe-c613-44cc-9fba-b26a691b5140', 'Node.js / JavaScript', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d54c19e9-0e31-49a3-9037-c3e2a8f6a8cd', '43a48cbe-c613-44cc-9fba-b26a691b5140', 'Python', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b5b2b2c7-0022-4df9-bc35-b18626d32f8a', '43a48cbe-c613-44cc-9fba-b26a691b5140', 'Java', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('aaee37f3-fe90-46e0-8971-460c91a910c8', '43a48cbe-c613-44cc-9fba-b26a691b5140', 'Go', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7973910e-56cd-4ffc-9c4e-c4f66b3019a5', '43a48cbe-c613-44cc-9fba-b26a691b5140', 'Ruby', NULL, NULL, 4);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('14f292af-881f-4772-816b-930d111de731', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Version Control', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a7c9e73c-574b-491b-9fe1-47593e90c1d5', '14f292af-881f-4772-816b-930d111de731', 'Git', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5203830e-a0b5-4a6e-8dd3-a4e2d467156b', '14f292af-881f-4772-816b-930d111de731', 'GitHub / GitLab', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('90d085fe-0309-4041-ae63-84168f359441', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Databases', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('53e7ac9d-83e1-4c00-907a-81728404b6e8', '90d085fe-0309-4041-ae63-84168f359441', 'Relational — PostgreSQL', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b248ee4a-74d5-4de2-9e7e-c275e52b996b', '90d085fe-0309-4041-ae63-84168f359441', 'Relational — MySQL', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a2a4ccb7-161b-4e07-98b8-c08678553518', '90d085fe-0309-4041-ae63-84168f359441', 'NoSQL — MongoDB', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c7fbb44e-8215-4e09-80a8-f07c90b4085d', '90d085fe-0309-4041-ae63-84168f359441', 'NoSQL — Redis', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('7f798b48-7eaa-4210-9374-c8b5daa900a7', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'APIs', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8f839a24-5264-45a9-852b-2ad5e0cd1844', '7f798b48-7eaa-4210-9374-c8b5daa900a7', 'REST', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('258c0b34-5d78-41e0-b980-d01ea1ae6149', '7f798b48-7eaa-4210-9374-c8b5daa900a7', 'GraphQL', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fd68bca1-a013-48f0-8b4d-86e7ca03c402', '7f798b48-7eaa-4210-9374-c8b5daa900a7', 'gRPC', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6415d522-886d-463a-b5c8-f8cc1319522f', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Authentication', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7c067d85-9f9c-4bcb-8fbf-111a7de7e1ef', '6415d522-886d-463a-b5c8-f8cc1319522f', 'JWT', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5630c786-d5a6-48c4-a08a-70be82101033', '6415d522-886d-463a-b5c8-f8cc1319522f', 'OAuth 2.0', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('91b40b8c-058e-4fd2-930a-a323c0d7a1fb', '6415d522-886d-463a-b5c8-f8cc1319522f', 'Session-based Auth', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('73a08912-9b75-4169-9bf1-7521493a50d3', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Caching', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('38312ca4-9194-4aea-9157-0b5d9c3c008b', '73a08912-9b75-4169-9bf1-7521493a50d3', 'Redis Caching', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('75887795-b8cb-4517-8cf6-3917c24880e6', '73a08912-9b75-4169-9bf1-7521493a50d3', 'CDN', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('93d9a20b-19f7-4647-9040-1cfa5c8d9d38', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Message Queues', 7);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fdcde093-4b4d-4828-9292-fbc433a15e2d', '93d9a20b-19f7-4647-9040-1cfa5c8d9d38', 'RabbitMQ', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6f50586c-76c3-402c-9ffd-ec0d3f9d2e10', '93d9a20b-19f7-4647-9040-1cfa5c8d9d38', 'Kafka', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d766b135-abe0-4384-8428-7c44774ba1dd', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Testing', 8);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6c210551-8fc1-4750-840d-c941ab731507', 'd766b135-abe0-4384-8428-7c44774ba1dd', 'Unit Testing', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('acbd35cc-9e9c-4164-9780-d70285262cd3', 'd766b135-abe0-4384-8428-7c44774ba1dd', 'Integration Testing', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4628b99c-db75-4bd2-a753-9a7ea90b151f', 'd766b135-abe0-4384-8428-7c44774ba1dd', 'E2E Testing', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('28e7de0d-1034-417b-aa02-fe7528a62cb5', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Deployment', 9);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('dac51b76-8083-4e32-899c-d13b9bc0e0d8', '28e7de0d-1034-417b-aa02-fe7528a62cb5', 'Docker', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8b6fe989-4518-4f77-bad5-eeaedb361208', '28e7de0d-1034-417b-aa02-fe7528a62cb5', 'CI/CD Pipelines', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('141be82a-d570-49bc-bd33-d186ea558345', '28e7de0d-1034-417b-aa02-fe7528a62cb5', 'Cloud Deployment', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a437dd49-a8ba-4290-af47-86239a7ddd19', 'dfef51d3-4f8b-4da6-806b-d16cf2702605', 'Security', 10);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5975919f-874a-4017-8ec5-a78ce50af1d1', 'a437dd49-a8ba-4290-af47-86239a7ddd19', 'OWASP Top 10', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('af72ff78-7a87-4e3a-ac13-77ebce21b96f', 'a437dd49-a8ba-4290-af47-86239a7ddd19', 'HTTPS / TLS', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d3bc6442-f161-4d64-8501-ec5ec7ead546', 'a437dd49-a8ba-4290-af47-86239a7ddd19', 'Rate Limiting', NULL, NULL, 2);

-- ── BI Analyst ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('f1956f0c-8b12-48bb-822d-475e174a7990', 'bi-analyst', 'BI Analyst', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('188fba60-d93a-4b95-a1c4-206306789fee', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'Business Intelligence Basics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d9d8db6a-a4dd-4c40-9dbb-44e025d1c6db', '188fba60-d93a-4b95-a1c4-206306789fee', 'What is BI?', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('da4bad9f-c212-42c4-8039-78537dac28f8', '188fba60-d93a-4b95-a1c4-206306789fee', 'OLAP vs OLTP', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('39c28129-0a4c-4706-b78e-fb9ba1e24a14', '188fba60-d93a-4b95-a1c4-206306789fee', 'Data Warehousing Concepts', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('7c4f836c-6425-4e7c-a8fd-e693d723172f', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'SQL for BI', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('db856948-07c1-4bc7-bec7-a510c5a45ff8', '7c4f836c-6425-4e7c-a8fd-e693d723172f', 'Complex JOINs', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fdf75b96-1fab-4fd5-9c73-fbb3f9cce299', '7c4f836c-6425-4e7c-a8fd-e693d723172f', 'Window Functions', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6486fc46-8db5-4ff9-a4b1-3a558aae3f1f', '7c4f836c-6425-4e7c-a8fd-e693d723172f', 'CTEs and Subqueries', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('0b60cc76-05e9-41cf-b31e-882238a8c8c4', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'Data Modeling', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4e19fe8b-65c8-4412-8ae5-052ceca19272', '0b60cc76-05e9-41cf-b31e-882238a8c8c4', 'Star Schema', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4826ef4b-430a-4499-9376-e5bd11c1eb1a', '0b60cc76-05e9-41cf-b31e-882238a8c8c4', 'Snowflake Schema', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f521535e-8247-4f7f-ac3d-6f6b84190d09', '0b60cc76-05e9-41cf-b31e-882238a8c8c4', 'Dimensional Modeling', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('832d34bf-b7c0-42fb-8a39-8c7d47c401c3', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'BI Tools', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5fb757c6-8e37-4ed7-8a91-78ad8aba56c5', '832d34bf-b7c0-42fb-8a39-8c7d47c401c3', 'Power BI', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a9cd19f3-9168-4b2f-9895-842863c9bee4', '832d34bf-b7c0-42fb-8a39-8c7d47c401c3', 'Tableau', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0157a520-6863-462b-8fde-cffa61de49ca', '832d34bf-b7c0-42fb-8a39-8c7d47c401c3', 'Looker / Metabase', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('bb49826f-e082-49fe-88eb-f03bc5e9638d', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'DAX & Calculated Fields', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('744deae5-3387-426d-a487-4490cea9000d', 'bb49826f-e082-49fe-88eb-f03bc5e9638d', 'Measures vs Calculated Columns', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6166da8b-13da-4b50-9953-6c29d321cae7', 'bb49826f-e082-49fe-88eb-f03bc5e9638d', 'Time Intelligence Functions', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b55f4dd5-7f45-4d7f-8fe2-94dbfc4fd600', 'bb49826f-e082-49fe-88eb-f03bc5e9638d', 'Context & Filters', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('45cda070-84af-4c6c-ae57-0e43cce1db18', 'f1956f0c-8b12-48bb-822d-475e174a7990', 'Storytelling with Data', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e3f7446e-5ebb-4700-874f-7eb5ff61f806', '45cda070-84af-4c6c-ae57-0e43cce1db18', 'Choosing the Right Chart', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7b112b2b-85d0-4be5-bf00-79242b4fa361', '45cda070-84af-4c6c-ae57-0e43cce1db18', 'Dashboard Design Principles', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('96ea1c01-0293-4f46-a451-58976f0bbbef', '45cda070-84af-4c6c-ae57-0e43cce1db18', 'Executive Reporting', NULL, NULL, 2);

-- ── Blockchain ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'blockchain', 'Blockchain', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('2e9ed6db-8944-4b57-b257-27f1fba3f4cd', 'ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'Blockchain Basics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('22952337-21a9-4c20-8099-b894749c1605', '2e9ed6db-8944-4b57-b257-27f1fba3f4cd', 'What is Blockchain?', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('85212c2c-62c0-4c8a-a7e2-2d51ac0693ab', '2e9ed6db-8944-4b57-b257-27f1fba3f4cd', 'Distributed Ledgers', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6ba54cf2-de7d-4adc-9475-186b79796621', '2e9ed6db-8944-4b57-b257-27f1fba3f4cd', 'Consensus Mechanisms', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6b838bc5-6e34-41ce-a41c-e0fba2069688', 'ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'Cryptography', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('84e183c6-d68b-4b8f-a257-755f358d381e', '6b838bc5-6e34-41ce-a41c-e0fba2069688', 'Hash Functions', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c1e3fc15-d23d-4df5-8880-44aef4dc5f0a', '6b838bc5-6e34-41ce-a41c-e0fba2069688', 'Public/Private Key', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bfeadbb9-8f5b-448b-9cce-23657e76e824', '6b838bc5-6e34-41ce-a41c-e0fba2069688', 'Digital Signatures', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('57700775-bf17-4e16-9516-343299c9d3db', 'ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'Smart Contracts', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cb219165-6337-4e6e-9852-506cdaef063b', '57700775-bf17-4e16-9516-343299c9d3db', 'Solidity Basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ec3282f8-98e8-41ce-ac4c-95b1d11a2550', '57700775-bf17-4e16-9516-343299c9d3db', 'ERC-20 / ERC-721 Tokens', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e489e86c-51d6-4fce-869f-b4da19be6646', '57700775-bf17-4e16-9516-343299c9d3db', 'Hardhat / Truffle', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('56967ed9-bd6c-449d-bd27-0a15cd4b7a75', 'ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'Ethereum', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0309e09e-7fdc-4a80-8443-bce5cf18ec9c', '56967ed9-bd6c-449d-bd27-0a15cd4b7a75', 'EVM Architecture', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cd265593-3fe5-4690-be69-2c57617b3d68', '56967ed9-bd6c-449d-bd27-0a15cd4b7a75', 'Gas and Fees', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6aba8184-133a-4319-bc16-50b087c89173', '56967ed9-bd6c-449d-bd27-0a15cd4b7a75', 'Metamask Integration', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('3dc09963-58bf-4d51-8dfd-7cb0d146b3c0', 'ffc270ff-27b6-4f0f-9a3c-ef3c7d3ffb59', 'DeFi & Web3', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1d06ae7b-f0a4-47fe-91be-c0a5c2cdbadb', '3dc09963-58bf-4d51-8dfd-7cb0d146b3c0', 'DeFi Protocols', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('32099b3e-4816-4f2a-980b-e2f3070e7f7c', '3dc09963-58bf-4d51-8dfd-7cb0d146b3c0', 'Web3.js / Ethers.js', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c3aa4d01-e11b-4278-a330-790843a394f5', '3dc09963-58bf-4d51-8dfd-7cb0d146b3c0', 'IPFS', NULL, NULL, 2);

-- ── Cyber Security ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'cyber-security', 'Cyber Security', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d5ac1d83-9dad-4167-a884-b13cc5d3ea1e', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Networking Fundamentals', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('90c54873-1e77-4dbe-a6c1-67226f2f4359', 'd5ac1d83-9dad-4167-a884-b13cc5d3ea1e', 'TCP/IP Model', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('467adfc7-1df3-4923-bf33-1bb8c22dd178', 'd5ac1d83-9dad-4167-a884-b13cc5d3ea1e', 'DNS, HTTP, TLS', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('15d96630-b48a-4012-a158-c3bc75cdfe92', 'd5ac1d83-9dad-4167-a884-b13cc5d3ea1e', 'Firewalls & VPNs', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('16661288-5cbf-455b-8c44-7555370cf590', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Security Concepts', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('08c7103e-fcf4-4eea-9217-eb3faa682b56', '16661288-5cbf-455b-8c44-7555370cf590', 'CIA Triad', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7f0b6e63-580e-4660-b1fd-42ad19e0ecc5', '16661288-5cbf-455b-8c44-7555370cf590', 'Authentication vs Authorization', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('933373fd-0a6a-4ba1-a653-70327b94501b', '16661288-5cbf-455b-8c44-7555370cf590', 'Cryptography Basics', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('56aa328c-24a1-4847-a33f-a05752cb89b4', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Web Security', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fee5d739-2d63-4bd4-aeb0-9ad36334d0f3', '56aa328c-24a1-4847-a33f-a05752cb89b4', 'OWASP Top 10', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('75bbb047-4725-4fae-8b16-ac4b3026a37a', '56aa328c-24a1-4847-a33f-a05752cb89b4', 'SQL Injection', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ec7438ca-dadc-466d-bfab-72a91685d7f6', '56aa328c-24a1-4847-a33f-a05752cb89b4', 'XSS', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('089f2185-afd2-47d5-8014-8b6c024de98b', '56aa328c-24a1-4847-a33f-a05752cb89b4', 'CSRF', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('9ba081f9-6c23-4781-b4ac-27e7dd4ff82d', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Penetration Testing', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fc1aeba5-51f0-4938-80e3-3f141eb4d09f', '9ba081f9-6c23-4781-b4ac-27e7dd4ff82d', 'Recon & Enumeration', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('51386dc5-c457-4459-94e2-4a92b9833810', '9ba081f9-6c23-4781-b4ac-27e7dd4ff82d', 'Metasploit', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('175e32af-f05f-4a11-b57b-354cd837b98a', '9ba081f9-6c23-4781-b4ac-27e7dd4ff82d', 'Burp Suite', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('393dd8c6-dbda-4e92-8d97-f41e7f39f874', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Incident Response', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('16d58ebd-6281-4ca6-ba27-28bf5f28a391', '393dd8c6-dbda-4e92-8d97-f41e7f39f874', 'Log Analysis', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('df6cda9d-19a0-498d-bc56-7b1a4987ba7a', '393dd8c6-dbda-4e92-8d97-f41e7f39f874', 'SIEM Tools', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('24c2c879-10ce-46e3-97e7-d68533879ffc', '393dd8c6-dbda-4e92-8d97-f41e7f39f874', 'Forensic Investigation', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6dfdf078-ff8c-4a84-8d9c-f97eddca7297', '7baa3959-31c5-46d5-a8c0-4b1e06bc70da', 'Certifications Path', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f2e27756-9689-4772-9db4-718b099c59c2', '6dfdf078-ff8c-4a84-8d9c-f97eddca7297', 'CompTIA Security+', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8f4b1118-51fb-48f7-9ce6-b11fd699de8e', '6dfdf078-ff8c-4a84-8d9c-f97eddca7297', 'CEH', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('43004471-62bc-4fc0-9e28-aeeb66863b94', '6dfdf078-ff8c-4a84-8d9c-f97eddca7297', 'OSCP', NULL, NULL, 2);

-- ── Data Analyst ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'data-analyst', 'Data Analyst', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('c758082c-af13-448c-b83f-19b178f09e01', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Statistics & Probability', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e4e1b6b6-2aea-4651-9c7e-48c24803da1a', 'c758082c-af13-448c-b83f-19b178f09e01', 'Descriptive Statistics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2a8cd574-e24b-4b45-985f-949389e78633', 'c758082c-af13-448c-b83f-19b178f09e01', 'Probability Distributions', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7c4c57e8-91d1-4ae2-8ab6-36d72cecab71', 'c758082c-af13-448c-b83f-19b178f09e01', 'Hypothesis Testing', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('87275742-f309-4c38-976d-29b6474b8beb', 'c758082c-af13-448c-b83f-19b178f09e01', 'Correlation vs Causation', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('867f5362-9f10-4b06-8c8c-6a7c7a81edbb', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Excel / Spreadsheets', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8858c6ad-55ed-4634-a06d-d21629eccb6a', '867f5362-9f10-4b06-8c8c-6a7c7a81edbb', 'Pivot Tables', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5d7f3ea4-a178-4e79-993e-fdfaa833b065', '867f5362-9f10-4b06-8c8c-6a7c7a81edbb', 'VLOOKUP / INDEX-MATCH', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b3fe0567-ad53-4dd3-b64b-b188fefa58eb', '867f5362-9f10-4b06-8c8c-6a7c7a81edbb', 'Charts and Graphs', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('e828a90f-2969-4d14-a068-8b911c6ff3f6', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'SQL', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e3f6cbf3-a361-495e-bbdb-7419d184815c', 'e828a90f-2969-4d14-a068-8b911c6ff3f6', 'SELECT, WHERE, GROUP BY', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1284f012-4bfc-46ce-a0f7-b960c56981f4', 'e828a90f-2969-4d14-a068-8b911c6ff3f6', 'JOINs', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('20b418e3-f047-4f42-b198-b24c69765793', 'e828a90f-2969-4d14-a068-8b911c6ff3f6', 'Window Functions', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4f10a4c5-93a5-46e6-ae39-18a810062a8b', 'e828a90f-2969-4d14-a068-8b911c6ff3f6', 'CTEs', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('4edc7bd1-171c-4835-b944-c3223f8f5e68', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Python for Analysis', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e7ed0a5f-aff7-4e44-874a-459ccfd55e6b', '4edc7bd1-171c-4835-b944-c3223f8f5e68', 'Pandas', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c10c28a2-3380-4606-9de0-f5ac3b553730', '4edc7bd1-171c-4835-b944-c3223f8f5e68', 'NumPy', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6c9b7409-0825-4a0f-a89f-ac1e3b6cbee1', '4edc7bd1-171c-4835-b944-c3223f8f5e68', 'Matplotlib / Seaborn', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('063e9e83-3389-4fb5-a61d-21627f1a306d', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Data Visualization', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9d2c3e64-4da9-4363-a7f5-3deecff5e821', '063e9e83-3389-4fb5-a61d-21627f1a306d', 'Tableau', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('231a9e93-a687-4fca-a015-28ac8969def9', '063e9e83-3389-4fb5-a61d-21627f1a306d', 'Power BI', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9bf34d13-4e0f-4e05-a2aa-a11eae887976', '063e9e83-3389-4fb5-a61d-21627f1a306d', 'Google Looker Studio', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8fd1f446-a5f6-4196-a087-b863dc73ed62', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Data Cleaning', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fb0b9312-0e8d-4fd6-bed4-25a04a0403b3', '8fd1f446-a5f6-4196-a087-b863dc73ed62', 'Handling Missing Values', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('373510f4-81bf-4e24-a74d-cc994acb854d', '8fd1f446-a5f6-4196-a087-b863dc73ed62', 'Outlier Detection', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c07e116e-d34f-40e9-8799-88f7d8687b3a', '8fd1f446-a5f6-4196-a087-b863dc73ed62', 'Data Normalization', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('0bf7bb7f-a052-4192-8b7d-f06b144842c9', '02d44d4b-bb36-4101-a752-f9e2f1f6101f', 'Business Acumen', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('41906ec0-0d0f-4ab9-b341-7f51379be9b5', '0bf7bb7f-a052-4192-8b7d-f06b144842c9', 'KPIs and Metrics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c9883033-64cd-4267-82b2-b43f676394fa', '0bf7bb7f-a052-4192-8b7d-f06b144842c9', 'A/B Testing', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('903b3629-d8cc-4350-9328-a729f3cf17a6', '0bf7bb7f-a052-4192-8b7d-f06b144842c9', 'Storytelling with Data', NULL, NULL, 2);

-- ── Data Engineer ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('d3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'data-engineer', 'Data Engineer', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('05f10184-578f-4ebb-a7e9-79e860d718fa', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Programming', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4c013a3b-16b3-43c7-938b-f18ed463bcd1', '05f10184-578f-4ebb-a7e9-79e860d718fa', 'Python', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c9d0c249-0d8a-4ccd-bc58-f3dff54400e1', '05f10184-578f-4ebb-a7e9-79e860d718fa', 'SQL', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('85ba645b-180c-4d21-a0e0-4c8ffe2b3f3b', '05f10184-578f-4ebb-a7e9-79e860d718fa', 'Scala (optional)', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5203738a-6c94-440e-823e-d629a14803f0', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Databases', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e5f2c85f-7b35-4f50-bb27-c617b6300788', '5203738a-6c94-440e-823e-d629a14803f0', 'PostgreSQL', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ce08d2ff-424b-40a1-a271-429c6f05c81e', '5203738a-6c94-440e-823e-d629a14803f0', 'MySQL', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8306496c-3887-4b03-b975-c15f768cb813', '5203738a-6c94-440e-823e-d629a14803f0', 'Cassandra', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1caa41d8-28f7-47be-bba1-46dc21b1e47e', '5203738a-6c94-440e-823e-d629a14803f0', 'MongoDB', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('37b7408c-636f-4dc7-9eb5-309ae65671c7', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Data Warehousing', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5410495a-982c-4b0b-b03d-75ba3607bafa', '37b7408c-636f-4dc7-9eb5-309ae65671c7', 'Snowflake', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9bb352d7-2574-4e01-91a3-84e1f7e8cbf8', '37b7408c-636f-4dc7-9eb5-309ae65671c7', 'BigQuery', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('47013da1-d1f9-4d9c-891c-383bf94a3433', '37b7408c-636f-4dc7-9eb5-309ae65671c7', 'Redshift', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('84f78703-004a-448a-b054-f35b6d79afc9', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Batch Processing', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('48901a3b-2c84-46c1-bbdc-3f259f692bbe', '84f78703-004a-448a-b054-f35b6d79afc9', 'Apache Spark', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('835c7c0b-0030-4f9e-9727-54e325502565', '84f78703-004a-448a-b054-f35b6d79afc9', 'Apache Hadoop', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('75113ea6-8fdb-46f9-81be-1cd173d701d8', '84f78703-004a-448a-b054-f35b6d79afc9', 'dbt', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d6e2b74a-0530-498a-87c2-21fde56349a4', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Stream Processing', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('15bec3dc-dee2-4971-94ec-8a8c6c882b57', 'd6e2b74a-0530-498a-87c2-21fde56349a4', 'Apache Kafka', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('62c008c7-449c-407f-91c0-994ddc25d801', 'd6e2b74a-0530-498a-87c2-21fde56349a4', 'Apache Flink', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2ffe35cc-029b-4701-9a36-7e5683bd4150', 'd6e2b74a-0530-498a-87c2-21fde56349a4', 'Spark Streaming', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d9b823ba-de20-47f8-8346-514b4a642b2d', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Data Pipelines & Orchestration', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e37a9df4-211c-482c-bac0-51d4aca4f701', 'd9b823ba-de20-47f8-8346-514b4a642b2d', 'Apache Airflow', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('11a965a9-4a85-41f6-9ef4-5433d264d36b', 'd9b823ba-de20-47f8-8346-514b4a642b2d', 'Prefect', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1638b47a-ee21-4d51-b236-c3d305364dce', 'd9b823ba-de20-47f8-8346-514b4a642b2d', 'Dagster', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8c8470f4-d34c-4bc5-82de-f6402845130d', 'd3bd9608-23aa-4f9e-bbb2-61efb329dbc2', 'Cloud Platforms', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('79209da6-062a-454d-bb12-d2520a915ebd', '8c8470f4-d34c-4bc5-82de-f6402845130d', 'AWS Data Services', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('58627644-a8e4-4fdc-ba60-6ba8fa909477', '8c8470f4-d34c-4bc5-82de-f6402845130d', 'GCP Data Services', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1ed3dfd4-7090-447a-9953-c8186213936b', '8c8470f4-d34c-4bc5-82de-f6402845130d', 'Azure Data Services', NULL, NULL, 2);

-- ── Developer Relations ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('411508bf-4a4f-4de9-a480-bd98e06eacac', 'developer-relations', 'Developer Relations', 'Management');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('74ed7369-ce26-40c2-ac19-66cd70dff318', '411508bf-4a4f-4de9-a480-bd98e06eacac', 'Community Building', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('aa8f38ef-bec8-438c-a811-f56bd00a37f5', '74ed7369-ce26-40c2-ac19-66cd70dff318', 'Developer Forums & Discord', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c81c1bdd-d479-4614-b4a6-167c32ce5384', '74ed7369-ce26-40c2-ac19-66cd70dff318', 'Meetups & Events', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f32a40d7-9f76-4531-a839-4f265ea15f8c', '74ed7369-ce26-40c2-ac19-66cd70dff318', 'Open Source Contribution', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('4c223c1c-d2a6-4501-9b10-649dd3b6a430', '411508bf-4a4f-4de9-a480-bd98e06eacac', 'Technical Content', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ef7ed5cf-f515-4eca-81a4-b2505b9a7c46', '4c223c1c-d2a6-4501-9b10-649dd3b6a430', 'Technical Blog Writing', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('74467e46-a64c-4d14-bd2d-6cad207b266a', '4c223c1c-d2a6-4501-9b10-649dd3b6a430', 'Video Tutorials', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c7870daa-6971-44b0-9e52-08ebc910adc0', '4c223c1c-d2a6-4501-9b10-649dd3b6a430', 'Documentation', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('93e22fa5-184f-41e5-9d77-b90c422e1d07', '411508bf-4a4f-4de9-a480-bd98e06eacac', 'Developer Advocacy', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0ddde100-a3de-47d9-a8c9-a73c7f5ed4d5', '93e22fa5-184f-41e5-9d77-b90c422e1d07', 'Conference Speaking', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b16b7876-42fd-4199-9e39-5ce3c4cfdd21', '93e22fa5-184f-41e5-9d77-b90c422e1d07', 'Workshops & Hackathons', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9cca24f3-61e8-4f25-9327-287d640372f6', '93e22fa5-184f-41e5-9d77-b90c422e1d07', 'Feedback Loops with Product', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('c24f87ca-a469-461f-8456-2fa425f7feac', '411508bf-4a4f-4de9-a480-bd98e06eacac', 'Metrics & Impact', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a4aed43b-9b3a-48db-993e-5bc4045089fe', 'c24f87ca-a469-461f-8456-2fa425f7feac', 'Community Growth KPIs', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6ea30c6f-65e9-454b-8cf5-59947e69143d', 'c24f87ca-a469-461f-8456-2fa425f7feac', 'Developer Sentiment', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f393ca88-eda8-4d7a-a656-f6d39ef70a44', 'c24f87ca-a469-461f-8456-2fa425f7feac', 'SDK / API Adoption', NULL, NULL, 2);

-- ── DevSecOps ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('12429d3e-4a54-4979-b84c-7a25e9c325ea', 'devsecops', 'DevSecOps', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a6ea9cdf-6df2-4bc4-a4e6-81f0131b2ff4', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'DevOps Fundamentals', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('eaa6a0bf-6efb-41fa-a778-2c645c8d9e51', 'a6ea9cdf-6df2-4bc4-a4e6-81f0131b2ff4', 'CI/CD Concepts', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('22100e9a-2ca0-4a19-b52d-94061083d423', 'a6ea9cdf-6df2-4bc4-a4e6-81f0131b2ff4', 'Infrastructure as Code', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3f994553-16b6-41ef-85fb-3e29b3acff3a', 'a6ea9cdf-6df2-4bc4-a4e6-81f0131b2ff4', 'Containerization', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('00c0734f-10ec-4753-ac2d-a0813c2d37fd', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'Security Fundamentals', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b4113d44-78fb-4bb0-8cad-ad840825db7b', '00c0734f-10ec-4753-ac2d-a0813c2d37fd', 'CIA Triad', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('453a3e8e-f20f-451d-9541-c46e8b866c9e', '00c0734f-10ec-4753-ac2d-a0813c2d37fd', 'Zero Trust Architecture', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e5239cce-dd14-4b58-9f07-3194f5775e98', '00c0734f-10ec-4753-ac2d-a0813c2d37fd', 'OWASP Top 10', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a102a081-eb41-41b7-8f5b-7fa399383129', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'Secure Coding Practices', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('943caa77-3114-4e32-ad0f-969925616eba', 'a102a081-eb41-41b7-8f5b-7fa399383129', 'Input Validation', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('27298746-c8db-4bc6-adc0-804c818e37a9', 'a102a081-eb41-41b7-8f5b-7fa399383129', 'Secrets Management', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4796a47a-8692-47d6-ba34-03d2fcc9ff56', 'a102a081-eb41-41b7-8f5b-7fa399383129', 'Dependency Scanning', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('16fef576-beed-4084-9893-e0f948833471', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'SAST / DAST', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2d2401de-bddb-4e25-8632-ade6a7260801', '16fef576-beed-4084-9893-e0f948833471', 'Static Analysis Tools', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8d034a98-9df4-4cf1-9da9-d2074246bc5a', '16fef576-beed-4084-9893-e0f948833471', 'Dynamic Analysis Tools', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('99711194-e300-4f4f-8b80-38ccaee8da70', '16fef576-beed-4084-9893-e0f948833471', 'SonarQube', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('0f3fa872-d0a5-4b60-8089-689155ff2aeb', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'Container Security', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7af9b6ec-422b-49ba-8d9d-e041e2a7b181', '0f3fa872-d0a5-4b60-8089-689155ff2aeb', 'Docker Security', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a7c64045-a697-4ce6-9433-15b6505c514a', '0f3fa872-d0a5-4b60-8089-689155ff2aeb', 'Kubernetes Security', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2d417de8-0924-4d7d-92d9-5963e603cf2f', '0f3fa872-d0a5-4b60-8089-689155ff2aeb', 'Image Scanning', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d4f08328-2191-4108-9c18-d90c85c2b5b4', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'Cloud Security', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0ccae706-81d7-4f8d-b0ae-b232e90f80c6', 'd4f08328-2191-4108-9c18-d90c85c2b5b4', 'IAM Policies', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e44dc056-3e63-4c5e-b284-b5d2d4636769', 'd4f08328-2191-4108-9c18-d90c85c2b5b4', 'Security Groups', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('37e6ccf6-2eb4-4358-b156-a2111cc1a775', 'd4f08328-2191-4108-9c18-d90c85c2b5b4', 'Encryption at Rest / Transit', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('fdb83d26-6c0c-4310-8cc0-a078b46c087c', '12429d3e-4a54-4979-b84c-7a25e9c325ea', 'Compliance & Governance', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('92f12446-10ac-4f96-99e2-05c0996dfd75', 'fdb83d26-6c0c-4310-8cc0-a078b46c087c', 'SOC 2', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('28627795-008a-43ea-8aaf-822dfffb5c38', 'fdb83d26-6c0c-4310-8cc0-a078b46c087c', 'ISO 27001', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0981d99c-c8ea-4961-aa5e-80501b229b1e', 'fdb83d26-6c0c-4310-8cc0-a078b46c087c', 'GDPR', NULL, NULL, 2);

-- ── Engineering Manager ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('2ea083cd-8711-4788-ba3b-51e562c1792f', 'engineering-manager', 'Engineering Manager', 'Management');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8da167b0-bc1c-4960-851b-648a5e0e4e16', '2ea083cd-8711-4788-ba3b-51e562c1792f', 'Leadership Fundamentals', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('424e91cb-381b-4817-b534-ab3f59b28179', '8da167b0-bc1c-4960-851b-648a5e0e4e16', '1-on-1 Meetings', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('963346ec-111d-429b-aa6d-e2d96892661b', '8da167b0-bc1c-4960-851b-648a5e0e4e16', 'Giving & Receiving Feedback', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('687b0ea7-c246-42ef-8b79-7a86b87cc7b3', '8da167b0-bc1c-4960-851b-648a5e0e4e16', 'Mentoring Engineers', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('429328dd-e079-4052-b3cb-ef36c6c90438', '2ea083cd-8711-4788-ba3b-51e562c1792f', 'Team Management', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ccb08db6-6e81-49ec-9a19-e7e3c4ed87ba', '429328dd-e079-4052-b3cb-ef36c6c90438', 'Hiring & Interviewing', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('986870e8-b639-4ca8-b96d-02347b57f0e1', '429328dd-e079-4052-b3cb-ef36c6c90438', 'Onboarding', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3eb1f96a-e701-4314-9144-7ff02a6cd095', '429328dd-e079-4052-b3cb-ef36c6c90438', 'Performance Reviews', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('f5563cf2-6b15-4791-879f-ca318432ea3b', '2ea083cd-8711-4788-ba3b-51e562c1792f', 'Project Management', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('13833f9e-0df7-4a55-8a11-4ce974801f2d', 'f5563cf2-6b15-4791-879f-ca318432ea3b', 'Agile / Scrum', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9a5c5df5-4ce7-431c-b5f7-0a275f553298', 'f5563cf2-6b15-4791-879f-ca318432ea3b', 'Sprint Planning', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6287d828-630f-4c1f-a038-5717c915ae16', 'f5563cf2-6b15-4791-879f-ca318432ea3b', 'Estimation & Prioritization', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('bbf6a7af-5e85-4afa-a828-14d53f0cff71', '2ea083cd-8711-4788-ba3b-51e562c1792f', 'Technical Leadership', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5b3ea92e-79f8-4c59-8a38-639b7cd00551', 'bbf6a7af-5e85-4afa-a828-14d53f0cff71', 'Architecture Reviews', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('31128457-1cba-4e62-8563-ec25b4143a85', 'bbf6a7af-5e85-4afa-a828-14d53f0cff71', 'Technical Debt Management', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('36e57d43-71fa-45ab-b645-d0f6e81ccd63', 'bbf6a7af-5e85-4afa-a828-14d53f0cff71', 'Code Review Culture', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('0766e978-9c1a-4861-a5e0-1c0dba48e59a', '2ea083cd-8711-4788-ba3b-51e562c1792f', 'Stakeholder Management', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2e4d4961-da6a-4e84-b35d-180bd51e2892', '0766e978-9c1a-4861-a5e0-1c0dba48e59a', 'Executive Communication', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('55be4ff6-c5a8-4dc8-9f6d-16e077db2cd7', '0766e978-9c1a-4861-a5e0-1c0dba48e59a', 'Cross-team Collaboration', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d99a03d1-471b-4184-b717-152e5598ff19', '0766e978-9c1a-4861-a5e0-1c0dba48e59a', 'OKRs & Goal Setting', NULL, NULL, 2);

-- ── Frontend ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('0389bf48-8ab2-4026-97f7-36161a96e55e', 'frontend', 'Frontend', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8f960d76-899e-4073-9bad-ea802c5b6b42', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Internet', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('aac489c6-a7b2-4930-89e1-4844e613d375', '8f960d76-899e-4073-9bad-ea802c5b6b42', 'How does the internet work?', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bd9204fc-b8e7-4818-91af-cefdd83653ad', '8f960d76-899e-4073-9bad-ea802c5b6b42', 'What is HTTP?', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d350add5-1a2f-4f86-995e-bd2b66d7305b', '8f960d76-899e-4073-9bad-ea802c5b6b42', 'DNS and how it works', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1cae8483-8fbb-4fb9-b629-e3371cb7f81b', '8f960d76-899e-4073-9bad-ea802c5b6b42', 'Domain Name', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ee92e824-1bb6-43ce-98e6-36df3056c019', '8f960d76-899e-4073-9bad-ea802c5b6b42', 'Hosting', NULL, NULL, 4);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('27cd3219-2813-4237-b94f-863a90d7f2db', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'HTML', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('042ac560-0d61-499c-8415-32d97637a170', '27cd3219-2813-4237-b94f-863a90d7f2db', 'Learn the basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cc3149de-83bb-4334-8f98-aec1461eae6c', '27cd3219-2813-4237-b94f-863a90d7f2db', 'Semantic HTML', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cce92835-d2e9-4a5d-92c5-4e3390249d94', '27cd3219-2813-4237-b94f-863a90d7f2db', 'Forms and Validations', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('32fa87fd-da84-4f06-b220-4ca2f14864ed', '27cd3219-2813-4237-b94f-863a90d7f2db', 'Accessibility', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fefe4f7c-3cd6-4e27-9af6-f51fbd8e60de', '27cd3219-2813-4237-b94f-863a90d7f2db', 'SEO Basics', NULL, NULL, 4);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('256b5420-df1b-46eb-86b0-b16936b94853', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'CSS', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b9679d9f-672e-4f30-87e8-be27b150a476', '256b5420-df1b-46eb-86b0-b16936b94853', 'Learn the basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e53e6ef9-b568-4d3b-abbd-4bd705de0d4d', '256b5420-df1b-46eb-86b0-b16936b94853', 'Layouts — Flexbox', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('098e3159-dfee-477f-966d-41d2558c0223', '256b5420-df1b-46eb-86b0-b16936b94853', 'Layouts — Grid', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a6cfe617-d8e8-4286-86eb-dd19465bf81b', '256b5420-df1b-46eb-86b0-b16936b94853', 'Responsive Design', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('41255161-2c3b-46b5-9e33-190f1a5c2ff8', '256b5420-df1b-46eb-86b0-b16936b94853', 'CSS Variables', NULL, NULL, 4);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'JavaScript', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ab9c74da-9d11-486f-8868-072a3f881a36', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'Syntax and Basic Constructs', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('669ece7c-4a66-4202-889b-66987cd4f392', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'DOM Manipulation', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c24e8bfa-757a-4154-a0fc-6653aa885bac', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'Fetch API / Ajax', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0e5f2887-e65f-4219-a6cf-ec7619ec9e49', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'ES6+ Features', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ffe22daa-49b0-47f2-a53f-e0ec55aa9881', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'Hoisting, Event Bubbling, Scope', NULL, NULL, 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('acc62bae-9977-4fa3-b631-b40ad7320146', '6abb0e6a-afef-4b8b-bc99-e4c2131e0cb0', 'Promises and Async/Await', NULL, NULL, 5);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('2112afd9-4e5f-4167-b141-fd971bea9dea', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Version Control', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fba7d0bd-a7d6-425f-a75e-04126338438f', '2112afd9-4e5f-4167-b141-fd971bea9dea', 'Git Basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('56852a7b-1c0f-437f-95eb-b740cf87536e', '2112afd9-4e5f-4167-b141-fd971bea9dea', 'GitHub', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('0e2a73fa-a335-4d47-8703-4c28ee7f09a0', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Package Managers', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('19be81f5-efef-4cf2-9c4e-a48b34c6fdc3', '0e2a73fa-a335-4d47-8703-4c28ee7f09a0', 'npm', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('242b4c2e-aca5-4471-a832-ae9e76af4962', '0e2a73fa-a335-4d47-8703-4c28ee7f09a0', 'yarn', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('af17f56d-7bc8-49ae-9246-686994c762d5', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Frameworks', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f019c552-c943-407e-8ecc-917c4b6c2a7c', 'af17f56d-7bc8-49ae-9246-686994c762d5', 'React', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('547185b6-ee1a-4ba0-96d3-8a31b520c7cd', 'af17f56d-7bc8-49ae-9246-686994c762d5', 'Vue.js', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('29a5c819-0a04-49ed-b642-8a9326b94ee6', 'af17f56d-7bc8-49ae-9246-686994c762d5', 'Angular', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a1e180c9-b680-4440-9f4c-eeb1ef878663', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'CSS Frameworks', 7);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0493372e-b9cf-45b2-9d1d-99e023977034', 'a1e180c9-b680-4440-9f4c-eeb1ef878663', 'Tailwind CSS', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('48306fd8-030f-4f69-a94c-b980184cb0d5', 'a1e180c9-b680-4440-9f4c-eeb1ef878663', 'Bootstrap', NULL, NULL, 1);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('4e4cbd2a-51a9-4496-9e6d-4ef8b1056a53', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Testing', 8);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3242691a-7d5c-4c17-9466-544023e3cf15', '4e4cbd2a-51a9-4496-9e6d-4ef8b1056a53', 'Jest', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('100648b6-cc51-49f9-9e71-6990d3156305', '4e4cbd2a-51a9-4496-9e6d-4ef8b1056a53', 'Cypress', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('278a4636-2b29-41dc-8361-262cc76a1cc6', '4e4cbd2a-51a9-4496-9e6d-4ef8b1056a53', 'Vitest', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d96fa32e-ee2f-4799-84d1-abb6557c2e8d', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'Web Performance', 9);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2678b3d0-61c0-4410-a0e4-f80222ff0fa1', 'd96fa32e-ee2f-4799-84d1-abb6557c2e8d', 'Core Web Vitals', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2de17096-76c6-4e67-8a9d-7fbabd1a7c61', 'd96fa32e-ee2f-4799-84d1-abb6557c2e8d', 'Lazy Loading', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('91b91de9-6b96-449f-a8e2-03506ab10236', 'd96fa32e-ee2f-4799-84d1-abb6557c2e8d', 'Code Splitting', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('b743a888-31e4-428f-a442-e7000ddb1b2a', '0389bf48-8ab2-4026-97f7-36161a96e55e', 'TypeScript', 10);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d12dab0d-5f3d-4e16-a613-85407b997ad5', 'b743a888-31e4-428f-a442-e7000ddb1b2a', 'Types and Interfaces', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fedbe380-e810-4890-9c41-f137192614b4', 'b743a888-31e4-428f-a442-e7000ddb1b2a', 'Generics', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ccf89b70-7002-4647-a277-ae9cf0462852', 'b743a888-31e4-428f-a442-e7000ddb1b2a', 'Type Utilities', NULL, NULL, 2);

-- ── Game Developer ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'game-developer', 'Game Developer', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5e62adea-425a-4f32-9c3e-1118a59a17a0', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Game Development Basics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('537dfbea-b6f1-488c-8b06-f406bfb38fff', '5e62adea-425a-4f32-9c3e-1118a59a17a0', 'Game Loop', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('633387ca-32ee-4e8d-87e4-78a0c1908bce', '5e62adea-425a-4f32-9c3e-1118a59a17a0', 'Game Engines Overview', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4f4aa21c-d6a4-4b31-ae75-4d6a6f942120', '5e62adea-425a-4f32-9c3e-1118a59a17a0', '2D vs 3D', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('24aac877-2165-47b5-ba1b-209daabf7c2f', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Unity', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ab6368b0-6b06-4df4-9299-ff1215cf1bad', '24aac877-2165-47b5-ba1b-209daabf7c2f', 'C# Basics for Unity', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bbb61083-6ae3-45bc-bff2-2defc0faef59', '24aac877-2165-47b5-ba1b-209daabf7c2f', 'Scene & GameObject', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('01454ec9-f4f0-4abc-8656-75d33df24cd4', '24aac877-2165-47b5-ba1b-209daabf7c2f', 'Physics & Colliders', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2ad78dec-f5b9-46ff-8002-38012edd15c4', '24aac877-2165-47b5-ba1b-209daabf7c2f', 'UI System', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('62ff93bd-6f07-43a3-9f73-b3d88a36390b', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Game Design', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2bfbba66-104b-4789-8973-b890c19448f7', '62ff93bd-6f07-43a3-9f73-b3d88a36390b', 'Game Mechanics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6e31116f-81b6-4f46-b270-f4910bffb21f', '62ff93bd-6f07-43a3-9f73-b3d88a36390b', 'Level Design', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('769bd4a7-4243-4d07-8473-7728e854edd5', '62ff93bd-6f07-43a3-9f73-b3d88a36390b', 'Player Experience', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('af9353a8-acb4-4a46-a998-1c14f2114e65', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Graphics & Rendering', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b25cb9e9-4733-4188-91ba-4c55cb2a11f0', 'af9353a8-acb4-4a46-a998-1c14f2114e65', 'Shaders Basics', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a7e8417b-333e-4bbe-b8d0-df863bd5cf05', 'af9353a8-acb4-4a46-a998-1c14f2114e65', 'Lighting', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cc63e1cc-1cb9-4203-9890-fde570ee0cb4', 'af9353a8-acb4-4a46-a998-1c14f2114e65', 'Animations', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8b0b77c2-6769-40f6-9bd6-d9442386e327', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Audio', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5e0ab475-8e4a-45c2-8ac8-d51d071131d3', '8b0b77c2-6769-40f6-9bd6-d9442386e327', 'Sound Effects', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('73020a35-657d-4a53-8d92-cd87f45b551a', '8b0b77c2-6769-40f6-9bd6-d9442386e327', 'Background Music', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d34ee1ff-e064-4a5d-86fd-b0ec7c37ea0e', '8b0b77c2-6769-40f6-9bd6-d9442386e327', 'Audio Mixer', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('30358290-c5f9-42a3-b300-21cd03cfede7', 'a660d8f8-6ef9-4f01-b553-afa367b0b6f0', 'Publishing', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('72c21188-8aaf-424d-94bd-984e0f708001', '30358290-c5f9-42a3-b300-21cd03cfede7', 'Build Settings', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6743b35f-3bf2-415a-8a2a-76fce809e148', '30358290-c5f9-42a3-b300-21cd03cfede7', 'Platform Export', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7570f252-3659-43c1-a0b5-dfb55244cb22', '30358290-c5f9-42a3-b300-21cd03cfede7', 'Steam / App Stores', NULL, NULL, 2);

-- ── iOS ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('faf40c48-e1ac-4cb8-b583-6bc276669d25', 'ios', 'iOS', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8c8a41f1-5956-4c23-8822-47c61808e94b', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'Swift Basics', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('754293c7-4785-48e9-8758-7e2958d95b50', '8c8a41f1-5956-4c23-8822-47c61808e94b', 'Variables & Constants', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0f222e11-eb9d-4738-8b69-a3e210f4fd39', '8c8a41f1-5956-4c23-8822-47c61808e94b', 'Optionals', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6e87588a-8f60-4604-a05e-70a070dcf60e', '8c8a41f1-5956-4c23-8822-47c61808e94b', 'Closures', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bdfc2882-bace-430b-adab-a79c121cd3f5', '8c8a41f1-5956-4c23-8822-47c61808e94b', 'Protocols & Generics', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('4d0a1b4a-d3b4-4448-8bc6-ffaabe8116cd', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'Xcode & Tooling', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('04abcbdc-8e49-413c-bf0a-1f30a350563d', '4d0a1b4a-d3b4-4448-8bc6-ffaabe8116cd', 'Xcode IDE', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a6586ebb-46db-4296-93ee-67c7c4892c60', '4d0a1b4a-d3b4-4448-8bc6-ffaabe8116cd', 'Simulators', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('386f1fc7-70bb-449c-880c-3163a7c00864', '4d0a1b4a-d3b4-4448-8bc6-ffaabe8116cd', 'Instruments (Profiling)', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('c4b41309-8ca5-4156-b1c9-4489ef9e9466', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'UI Frameworks', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7075bdc0-77fb-48a4-8823-a547d5778bcf', 'c4b41309-8ca5-4156-b1c9-4489ef9e9466', 'SwiftUI', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d3b2be6f-536b-4f9e-9944-144b6f6cbf1b', 'c4b41309-8ca5-4156-b1c9-4489ef9e9466', 'UIKit', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2e674154-a792-40b5-821f-7cac7ad83c05', 'c4b41309-8ca5-4156-b1c9-4489ef9e9466', 'Auto Layout', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('07318a8a-dbb5-4c6b-8858-cd91711edded', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'Data Persistence', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a6032e36-29f5-4f61-b601-ca23cd1efeb7', '07318a8a-dbb5-4c6b-8858-cd91711edded', 'UserDefaults', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ce6562b6-0102-486a-8336-c8780683c355', '07318a8a-dbb5-4c6b-8858-cd91711edded', 'Core Data', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d818e7ee-13de-46ed-a3d2-16b46bf323d4', '07318a8a-dbb5-4c6b-8858-cd91711edded', 'Swift Data', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('91afb2bc-a92c-4ad7-a977-fb59087c4a84', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'Networking', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('659a2bbb-263b-462f-9882-0dd327906317', '91afb2bc-a92c-4ad7-a977-fb59087c4a84', 'URLSession', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a53a4edf-c330-49d7-a16f-435ab69df0f9', '91afb2bc-a92c-4ad7-a977-fb59087c4a84', 'Codable / JSON Parsing', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fdbb5529-5a8d-46aa-9571-13e45760b69a', '91afb2bc-a92c-4ad7-a977-fb59087c4a84', 'Async/Await in Swift', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('cf891815-a41d-483c-8923-bbe9284e52c8', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'App Architecture', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7e49f34e-030f-4157-afa8-70d054bfc17c', 'cf891815-a41d-483c-8923-bbe9284e52c8', 'MVC', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a1fbe093-0c47-4900-bddf-a84b1942b3b1', 'cf891815-a41d-483c-8923-bbe9284e52c8', 'MVVM', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('29267718-a600-4010-a47f-97d3ed119fac', 'cf891815-a41d-483c-8923-bbe9284e52c8', 'Clean Architecture', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('fed73e07-29a5-425f-95e0-1c4c13973ad9', 'faf40c48-e1ac-4cb8-b583-6bc276669d25', 'App Store Deployment', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('eea34b4d-aa9b-4ae8-ad95-d045ff2b0562', 'fed73e07-29a5-425f-95e0-1c4c13973ad9', 'TestFlight', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fe6d0368-7f8e-4cf4-90af-6b19058f102c', 'fed73e07-29a5-425f-95e0-1c4c13973ad9', 'App Store Connect', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('769367de-488a-40b0-8d34-bc492d447f4c', 'fed73e07-29a5-425f-95e0-1c4c13973ad9', 'Code Signing', NULL, NULL, 2);

-- ── Machine Learning ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('43251d5c-f068-4c89-ad1d-088d2f2a292a', 'machine-learning', 'Machine Learning', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5b4995e6-0f3d-4d29-b1fb-1dbe949d1b32', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Mathematics Foundations', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('425141c8-d67c-43d2-ad4e-1ebf06a13f72', '5b4995e6-0f3d-4d29-b1fb-1dbe949d1b32', 'Linear Algebra', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('cd20e937-f7ea-4ea6-8551-671d7b024e5f', '5b4995e6-0f3d-4d29-b1fb-1dbe949d1b32', 'Calculus', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('785e21a9-2733-475e-9749-02018df2bbae', '5b4995e6-0f3d-4d29-b1fb-1dbe949d1b32', 'Probability & Statistics', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('4edc631a-45a5-4b88-9244-c303fb4b8ef8', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Python for ML', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('91ac734e-e298-4c43-8a4c-813cbccccedc', '4edc631a-45a5-4b88-9244-c303fb4b8ef8', 'Scikit-Learn', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c7801afa-31e0-4d97-ac38-5ceb284770c6', '4edc631a-45a5-4b88-9244-c303fb4b8ef8', 'Pandas', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6cf9aa2e-9dcc-4e38-8ad8-509f58f364b8', '4edc631a-45a5-4b88-9244-c303fb4b8ef8', 'NumPy', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('cf6d82c0-238d-4f43-b080-e0c8a43e6a73', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Supervised Learning', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('6f0fcfc3-c1bf-4cfe-9fc8-74c1600060d7', 'cf6d82c0-238d-4f43-b080-e0c8a43e6a73', 'Linear Regression', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0f7a5021-e3d3-43de-a5aa-b3ce7ed2e1aa', 'cf6d82c0-238d-4f43-b080-e0c8a43e6a73', 'Logistic Regression', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bfad1024-ce71-4de2-98ac-a0224f5e5f27', 'cf6d82c0-238d-4f43-b080-e0c8a43e6a73', 'Decision Trees', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9e3d8cfc-0497-42f4-9ba0-357620ffab27', 'cf6d82c0-238d-4f43-b080-e0c8a43e6a73', 'Random Forest', NULL, NULL, 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('27c8ec75-6e72-44e6-9a53-c80b8e57399f', 'cf6d82c0-238d-4f43-b080-e0c8a43e6a73', 'SVM', NULL, NULL, 4);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('584e2c66-d30e-48d6-bce6-1edf97ab937d', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Unsupervised Learning', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3958c0ed-301a-4d7e-adcc-f281468eef58', '584e2c66-d30e-48d6-bce6-1edf97ab937d', 'K-Means Clustering', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('253f76f1-d91e-49cf-816c-9764c42a972a', '584e2c66-d30e-48d6-bce6-1edf97ab937d', 'PCA', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fe63a70b-1dff-40f0-a6bd-937e4cd6deb6', '584e2c66-d30e-48d6-bce6-1edf97ab937d', 'Autoencoders', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('18e7f4d0-91b4-4b6c-923f-79976b4e653a', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Deep Learning', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('068d5ee4-71f7-4826-9b48-e9998f1ef4c9', '18e7f4d0-91b4-4b6c-923f-79976b4e653a', 'Neural Networks', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('458e3dc8-d66b-4214-9bf1-4aca7d2b19f4', '18e7f4d0-91b4-4b6c-923f-79976b4e653a', 'Backpropagation', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d5ca844f-6620-42da-80c7-2644576a6865', '18e7f4d0-91b4-4b6c-923f-79976b4e653a', 'Convolutional Networks', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('13a833d1-c430-4900-9840-0afab4b5133c', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'Model Evaluation', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7f2508a9-64a3-4ba6-9ba3-bea8fb2f3ecc', '13a833d1-c430-4900-9840-0afab4b5133c', 'Cross Validation', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f593b38b-7828-4dcd-9527-0427dd0949b4', '13a833d1-c430-4900-9840-0afab4b5133c', 'Precision / Recall / F1', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c0b4c3cb-7193-4b6b-b37b-5b101ee88506', '13a833d1-c430-4900-9840-0afab4b5133c', 'ROC-AUC', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('dc08d490-be9b-4faa-a2be-a5acdf62faf1', '43251d5c-f068-4c89-ad1d-088d2f2a292a', 'MLOps', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d8b44966-597b-4f27-859b-11f5c6be02b3', 'dc08d490-be9b-4faa-a2be-a5acdf62faf1', 'Experiment Tracking (MLflow)', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ce008c14-9a86-43fd-8a69-83ae28639288', 'dc08d490-be9b-4faa-a2be-a5acdf62faf1', 'Model Versioning', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9cb63e16-3e4d-4dc3-9d33-d841a261e27b', 'dc08d490-be9b-4faa-a2be-a5acdf62faf1', 'Model Serving', NULL, NULL, 2);

-- ── MLOps ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'mlops', 'MLOps', 'Data & AI');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('99fe2c45-4fa1-4210-a9fb-c3e2f932c02c', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'ML Fundamentals', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('59097794-29b4-42b6-a750-9499c6123726', '99fe2c45-4fa1-4210-a9fb-c3e2f932c02c', 'ML Lifecycle', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('029533be-20f1-4a7a-b903-47c55649b62d', '99fe2c45-4fa1-4210-a9fb-c3e2f932c02c', 'Model Training & Evaluation', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3f32ce25-b890-4d04-ab3d-a86baa2fd8ce', '99fe2c45-4fa1-4210-a9fb-c3e2f932c02c', 'Feature Engineering', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('2e22282c-fc40-4636-b9b9-79cca5a5970f', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'Version Control for ML', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('1d102f57-95e5-48d8-9257-fc40765a0f0f', '2e22282c-fc40-4636-b9b9-79cca5a5970f', 'DVC (Data Version Control)', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9ac345cf-9352-4e16-a93b-a1a6c82ba4ad', '2e22282c-fc40-4636-b9b9-79cca5a5970f', 'Git for ML Projects', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('34d27855-6ef2-4b6a-a995-b7eb12631a8d', '2e22282c-fc40-4636-b9b9-79cca5a5970f', 'Model Registry', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('282d4c74-8457-4144-ace4-255f1ea63284', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'Experiment Tracking', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('70e8d2b4-34e1-419b-b842-e492c569bd7a', '282d4c74-8457-4144-ace4-255f1ea63284', 'MLflow', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a5a6b988-0d00-45a4-b5bc-bf9bdae44767', '282d4c74-8457-4144-ace4-255f1ea63284', 'Weights & Biases', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bde81eec-6075-4aee-a84e-47390ccd1cc8', '282d4c74-8457-4144-ace4-255f1ea63284', 'Neptune.ai', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8c6b3a82-cffa-448e-9a0c-1eef0a737805', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'Model Serving', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f31a76e8-1da1-421b-959b-6cbd306e3335', '8c6b3a82-cffa-448e-9a0c-1eef0a737805', 'BentoML', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c4c81742-1907-4cf7-9b5f-c8a272dfa48d', '8c6b3a82-cffa-448e-9a0c-1eef0a737805', 'TensorFlow Serving', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a48f5464-f797-4530-992a-e8ec16f0130c', '8c6b3a82-cffa-448e-9a0c-1eef0a737805', 'FastAPI for Models', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('b607f81c-6771-4647-9479-acfa3478c149', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'ML Pipelines', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bc264bdf-dfab-4e08-bed6-fee28f5fcb15', 'b607f81c-6771-4647-9479-acfa3478c149', 'Kubeflow', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('038dda1e-761c-4d1c-ab39-e8a5087b4bf7', 'b607f81c-6771-4647-9479-acfa3478c149', 'Apache Airflow for ML', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ad7d722d-a757-4388-a0ea-837f48397743', 'b607f81c-6771-4647-9479-acfa3478c149', 'ZenML', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('d213b169-d349-4e63-b629-6571be20f75c', 'ed8a640b-db3b-45bf-8ed0-27f1f5dbe802', 'Model Monitoring', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('08e49bdd-10ec-46f1-a41b-2f64d65d7d42', 'd213b169-d349-4e63-b629-6571be20f75c', 'Data Drift Detection', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('924d2f7b-4a17-4964-a7ab-f365e88eb95a', 'd213b169-d349-4e63-b629-6571be20f75c', 'Concept Drift', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('771fbf64-2fbb-480d-95ab-eba871bea193', 'd213b169-d349-4e63-b629-6571be20f75c', 'Evidently AI', NULL, NULL, 2);

-- ── PostgreSQL ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('ce4c1abe-862f-4693-9fb4-e04b662083c2', 'postgresql', 'PostgreSQL', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('9b30d855-1436-47c7-a03d-23c9334aee5c', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Getting Started', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('43db23c1-0597-4563-b46e-d992e5b23f80', '9b30d855-1436-47c7-a03d-23c9334aee5c', 'Installation & Setup', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5eef6c0c-a798-4b8b-84e8-de4d677f9932', '9b30d855-1436-47c7-a03d-23c9334aee5c', 'psql CLI', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f4052152-d3d5-4633-8b49-8bb3a18a6f33', '9b30d855-1436-47c7-a03d-23c9334aee5c', 'pgAdmin', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('968df3fd-4c98-4c82-b18d-d212ae5bb5f4', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'SQL Basics', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b6fb6683-6799-447b-a50a-2ddb654195dc', '968df3fd-4c98-4c82-b18d-d212ae5bb5f4', 'SELECT, INSERT, UPDATE, DELETE', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a70b034f-21c1-40a5-8750-76830ce7ddbd', '968df3fd-4c98-4c82-b18d-d212ae5bb5f4', 'Filtering & Sorting', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f11859f2-9d31-4518-8aa0-e48f3ce88bae', '968df3fd-4c98-4c82-b18d-d212ae5bb5f4', 'Aggregations', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('a3335081-825a-4159-af6c-aa912e754fb8', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Advanced SQL', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('35f7dfe2-f0bc-4eff-af5c-1bb38a4e4d13', 'a3335081-825a-4159-af6c-aa912e754fb8', 'JOINs', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('969a6f34-2ebc-4360-b89d-6918d785bd27', 'a3335081-825a-4159-af6c-aa912e754fb8', 'Window Functions', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('33e8ff34-c154-481c-b09f-5220dfb2ba96', 'a3335081-825a-4159-af6c-aa912e754fb8', 'CTEs', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('851d94e8-60b3-4bd5-980e-4264e341f14f', 'a3335081-825a-4159-af6c-aa912e754fb8', 'Subqueries', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('cc4c495e-78f5-42e6-9448-da8700f8b03b', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Indexes', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('52700311-d282-4062-b6ec-a6e63fbd1d41', 'cc4c495e-78f5-42e6-9448-da8700f8b03b', 'B-Tree Index', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('23c51382-30f8-4152-8000-fc4e4195f25d', 'cc4c495e-78f5-42e6-9448-da8700f8b03b', 'GIN / GiST Index', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5103e199-873e-4574-a782-50de90afc731', 'cc4c495e-78f5-42e6-9448-da8700f8b03b', 'Partial Indexes', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3f882cff-2b00-43e5-b5b6-db15af283595', 'cc4c495e-78f5-42e6-9448-da8700f8b03b', 'EXPLAIN ANALYZE', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('bd475f8f-ed1c-4b6d-9d45-340e71dc988a', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Transactions', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('7d5861aa-3ac5-48fa-8c12-6eda964973ca', 'bd475f8f-ed1c-4b6d-9d45-340e71dc988a', 'ACID Properties', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9fa18049-e4ce-4686-a22f-ebee48aea4cb', 'bd475f8f-ed1c-4b6d-9d45-340e71dc988a', 'BEGIN / COMMIT / ROLLBACK', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4826948d-c41f-469d-939a-4de6481a5619', 'bd475f8f-ed1c-4b6d-9d45-340e71dc988a', 'Isolation Levels', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('3172915f-53b0-4977-85a8-83249af6fbda', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Functions & Triggers', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fd0d5519-34b9-4edf-be40-de01c99e8879', '3172915f-53b0-4977-85a8-83249af6fbda', 'PL/pgSQL', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('11cc16f9-2756-470b-963a-66bdd55b2d68', '3172915f-53b0-4977-85a8-83249af6fbda', 'Stored Procedures', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('55702f73-610f-4a24-86fa-d696f963eb4b', '3172915f-53b0-4977-85a8-83249af6fbda', 'Triggers', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('ccdd24d9-380b-4cad-9ff3-4eeecacd8a70', 'ce4c1abe-862f-4693-9fb4-e04b662083c2', 'Administration', 6);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e04c2a43-30e4-4d8f-8b79-bcd47d5a38d9', 'ccdd24d9-380b-4cad-9ff3-4eeecacd8a70', 'Users & Roles', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('dbe86c9f-0b7a-44b8-b741-a088d52210b3', 'ccdd24d9-380b-4cad-9ff3-4eeecacd8a70', 'Backup & Restore', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('fff81c38-56e3-4ff9-9ae1-9b8a64aba955', 'ccdd24d9-380b-4cad-9ff3-4eeecacd8a70', 'Replication', NULL, NULL, 2);

-- ── QA ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'qa', 'QA', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('fe002d78-5290-4403-a92f-84d207035020', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'Testing Fundamentals', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('c2cfde13-baf7-4679-967e-123fd7e79df0', 'fe002d78-5290-4403-a92f-84d207035020', 'SDLC & STLC', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('385c60a2-532d-4509-99a6-8c029a7dc716', 'fe002d78-5290-4403-a92f-84d207035020', 'Test Planning', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b99f1938-b707-4144-a117-91e4f06e7132', 'fe002d78-5290-4403-a92f-84d207035020', 'Test Cases & Test Suites', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('24df60a8-79b0-426d-b53d-30f5c4ffdb67', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'Manual Testing', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('f3e4147b-99ed-44da-8cbc-1215aa313e06', '24df60a8-79b0-426d-b53d-30f5c4ffdb67', 'Black Box Testing', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bc6286f8-952e-4fd3-8f81-468bb617cdea', '24df60a8-79b0-426d-b53d-30f5c4ffdb67', 'Exploratory Testing', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('93515b4e-4186-4978-9876-61138e943013', '24df60a8-79b0-426d-b53d-30f5c4ffdb67', 'Regression Testing', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('6bf59e95-05b0-4ca2-ae45-c5dd0c4f9bc9', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'Automation Testing', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('bba719f9-3e36-4367-ab63-92cf9e2900c7', '6bf59e95-05b0-4ca2-ae45-c5dd0c4f9bc9', 'Selenium', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4a42aa71-761e-4dcd-985b-e52a60e21a0c', '6bf59e95-05b0-4ca2-ae45-c5dd0c4f9bc9', 'Cypress', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('dbe3e349-6e6e-4137-bcd2-9b859fe5b416', '6bf59e95-05b0-4ca2-ae45-c5dd0c4f9bc9', 'Playwright', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5a8f99b5-c20c-405e-ab3d-79bbdcc0e40a', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'API Testing', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b1adbbbd-b72f-404d-8d99-94903c7d0c98', '5a8f99b5-c20c-405e-ab3d-79bbdcc0e40a', 'Postman', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4cb2afc2-8162-4f14-b166-6e7cd7284f74', '5a8f99b5-c20c-405e-ab3d-79bbdcc0e40a', 'REST Assured', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b95af02c-bc2c-4674-9e90-89e324750f43', '5a8f99b5-c20c-405e-ab3d-79bbdcc0e40a', 'Newman', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('aba6a13b-a625-43e4-a9d6-2b7b25c0ade1', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'Performance Testing', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('2f88ea81-6983-4012-9c1b-05406910e379', 'aba6a13b-a625-43e4-a9d6-2b7b25c0ade1', 'JMeter', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('b6b84c24-ad20-4c5b-918e-e2e47cb22b69', 'aba6a13b-a625-43e4-a9d6-2b7b25c0ade1', 'k6', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d3d1cf92-2f6b-4f6a-93f6-697ab8c8a795', 'aba6a13b-a625-43e4-a9d6-2b7b25c0ade1', 'Load vs Stress Testing', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('789b5a3e-ed20-4971-a40f-6e28321e9fed', 'febe1daa-d42f-439d-bc5f-ca3ce92f3299', 'CI/CD for QA', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('ac15c585-f440-406e-bff0-16f1ee5516de', '789b5a3e-ed20-4971-a40f-6e28321e9fed', 'Integrating Tests in Pipeline', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('5ec4a430-3a47-4b9c-bcba-e8d23c2c2044', '789b5a3e-ed20-4971-a40f-6e28321e9fed', 'Test Reporting', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0d6ca52f-c51b-40ce-9203-529421e47a16', '789b5a3e-ed20-4971-a40f-6e28321e9fed', 'Allure Reports', NULL, NULL, 2);

-- ── Software Architect ─────────────────────────────────────────────
insert into roadmaps (id, slug, title, category)
  values ('513e38e4-b143-40fd-834d-ba85384c35bf', 'software-architect', 'Software Architect', 'Engineering');

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('8260b6dc-79b3-447a-9a54-1e281bdf2877', '513e38e4-b143-40fd-834d-ba85384c35bf', 'Design Patterns', 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0421a854-d37f-4c0a-b6c3-a579a066d482', '8260b6dc-79b3-447a-9a54-1e281bdf2877', 'Creational Patterns', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('45bf0d36-981b-4ada-9a88-d9c4edd8fc0b', '8260b6dc-79b3-447a-9a54-1e281bdf2877', 'Structural Patterns', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('12f97882-c340-429d-923d-53de2b83628e', '8260b6dc-79b3-447a-9a54-1e281bdf2877', 'Behavioral Patterns', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('c877d583-9965-4188-b8c5-ff0bbe62622c', '513e38e4-b143-40fd-834d-ba85384c35bf', 'Architecture Styles', 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('d1cfbcea-5637-47c0-b928-97bf3ea5646c', 'c877d583-9965-4188-b8c5-ff0bbe62622c', 'Monolithic', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('51de4479-2f68-4581-ba6e-211b898eaedc', 'c877d583-9965-4188-b8c5-ff0bbe62622c', 'Microservices', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('73e44966-09c0-4ac6-b270-807ce67cea50', 'c877d583-9965-4188-b8c5-ff0bbe62622c', 'Event-Driven', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('278e20c1-72e3-4b37-bad6-e62f9dd21309', 'c877d583-9965-4188-b8c5-ff0bbe62622c', 'Serverless', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('9e328e69-0bbf-4e56-acea-ec8473b7ff11', '513e38e4-b143-40fd-834d-ba85384c35bf', 'System Design', 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('a0c5b8e8-e19b-41ca-9040-5d08333d78eb', '9e328e69-0bbf-4e56-acea-ec8473b7ff11', 'Scalability', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('3481f523-aa30-4ffa-8a5a-c96964e097bd', '9e328e69-0bbf-4e56-acea-ec8473b7ff11', 'Load Balancing', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('44fc0627-7069-4834-9d70-0bfe31231ec7', '9e328e69-0bbf-4e56-acea-ec8473b7ff11', 'Caching Strategies', NULL, NULL, 2);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('0f7c1327-3137-4fed-9805-b522be89dd3b', '9e328e69-0bbf-4e56-acea-ec8473b7ff11', 'CAP Theorem', NULL, NULL, 3);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('5e6d9df1-1b2b-4edb-a38c-fad471761f85', '513e38e4-b143-40fd-834d-ba85384c35bf', 'API Design', 3);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('9c4abc12-367d-41bc-bbe1-e0d3e0295965', '5e6d9df1-1b2b-4edb-a38c-fad471761f85', 'REST Best Practices', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('39d068a7-de6b-4d2f-8e20-b095732946f4', '5e6d9df1-1b2b-4edb-a38c-fad471761f85', 'GraphQL', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('db963a5f-27db-437f-a95d-6af2121d6948', '5e6d9df1-1b2b-4edb-a38c-fad471761f85', 'API Versioning', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('61161dd6-55c3-4270-a901-864426ca8aa8', '513e38e4-b143-40fd-834d-ba85384c35bf', 'Security Architecture', 4);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('e79fb12d-657e-4628-b0d9-0575ea0be8e1', '61161dd6-55c3-4270-a901-864426ca8aa8', 'Authentication & Authorization', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('68f3bcb1-f3da-4986-8b06-75b789e5eb0b', '61161dd6-55c3-4270-a901-864426ca8aa8', 'Data Encryption', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('4252cac9-db50-4ea1-8238-7c8a7558ca2d', '61161dd6-55c3-4270-a901-864426ca8aa8', 'Secure by Design', NULL, NULL, 2);

insert into roadmap_topics (id, roadmap_id, title, order_index)
  values ('df647adc-0ad7-4ffc-9c95-23f68562fc75', '513e38e4-b143-40fd-834d-ba85384c35bf', 'Documentation', 5);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('8a66a63e-64f8-4a32-8ace-8451fee2dedd', 'df647adc-0ad7-4ffc-9c95-23f68562fc75', 'Architecture Decision Records', NULL, NULL, 0);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('95fa2b39-db72-45b2-92c4-5121fdc09000', 'df647adc-0ad7-4ffc-9c95-23f68562fc75', 'C4 Model', NULL, NULL, 1);
insert into roadmap_subtopics (id, topic_id, title, resource_url, resource_type, order_index)
  values ('87d6ee1c-3432-44a4-8715-5a1c5878ce5f', 'df647adc-0ad7-4ffc-9c95-23f68562fc75', 'Technical Specs', NULL, NULL, 2);
