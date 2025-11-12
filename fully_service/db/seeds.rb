# db/seeds.rb

DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

# Routine normale pour la plupart des jours
ROUTINE_ITEMS = [
  { start_time: '05:15:00', end_time: '05:20:00', description: 'Réveil, hydratation (1 verre d’eau) + étirements légers (5 min)' },
  { start_time: '05:30:00', end_time: '06:30:00', description: 'Musculation en salle selon le programme du jour' },
  { start_time: '06:30:00', end_time: '07:00:00', description: 'Douche + petit-déjeuner énergétique' },
  { start_time: '07:00:00', end_time: '09:00:00', description: 'Session d’apprentissage technique (frameworks, concepts backend)' },
  { start_time: '09:00:00', end_time: '12:00:00', description: 'Travail sur projets freelance / personnels' },
  { start_time: '12:00:00', end_time: '13:00:00', description: 'Déjeuner + courte marche de 10-15 min' },
  { start_time: '13:00:00', end_time: '16:00:00', description: 'Travail de développement ou apprentissage pratique (Rails, Node.js, Flask)' },
  { start_time: '16:00:00', end_time: '17:00:00', description: 'Pause active, lecture tech, ou sieste courte (20 min max)' },
  { start_time: '17:00:00', end_time: '19:00:00', description: 'Apprentissage DevOps : Docker, CI/CD, Linux, Cloud (AWS, GCP, etc.)' },
  { start_time: '19:00:00', end_time: '20:00:00', description: 'Dîner + détente' },
  { start_time: '20:00:00', end_time: '21:30:00', description: 'Lecture, veille technologique, planification du lendemain' },
  { start_time: '21:30:00', end_time: '22:00:00', description: 'Préparation sommeil, respiration, coucher' }
]

# Routine spécifique par jour
ROUTINE_BY_DAY = {
  "Lundi" => ROUTINE_ITEMS,
  "Mardi" => ROUTINE_ITEMS,
  "Mercredi" => ROUTINE_ITEMS,
  "Jeudi" => [
    { start_time: '08:00:00', end_time: '08:45:00', description: 'Marche rapide 30-45 min' },
    { start_time: '09:00:00', end_time: '09:30:00', description: 'Natation 20-30 min' }
  ],
  "Vendredi" => ROUTINE_ITEMS,
  "Samedi" => ROUTINE_ITEMS,
  "Dimanche" => [] # repos
}

puts "Création des suivis..."

8.times do |week_index|
  week = week_index + 1
  DAYS.each do |day|
    items = ROUTINE_BY_DAY[day] || []
    items.each do |item|
      Suivi.create!(
        start_time: item[:start_time],
        end_time: item[:end_time],
        description: item[:description],
        week: week,
        day: day,
        completed: false,
        remarque: ""
      )
    end
  end
end

puts "Seed terminé !"
