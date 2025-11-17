class Objectif < ApplicationRecord
  CATEGORIES = ["Finance", "Personnel", "Travail", "Sante", "Loisir"].freeze
  OBJECTIF_STATUSES = { defini: 0, en_cours: 1, termine: 2, bloque: 3 }.freeze
  PRIORITIES = { low: 1, medium: 2, high: 3 }.freeze

  validates :title, presence: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }
  validates :objectif_status, presence: true, inclusion: { in: OBJECTIF_STATUSES.values }
  validates :priority, presence: true, inclusion: { in: PRIORITIES.values }

  # Défaut à la création
  after_initialize do
    if new_record?
      self.objectif_status ||= OBJECTIF_STATUSES[:defini]
      self.priority ||= PRIORITIES[:medium]
    end
  end

  # Méthodes pour "simuler" l'enum
  OBJECTIF_STATUSES.each do |key, value|
    define_method("#{key}?") do
      objectif_status == value
    end
  end

  PRIORITIES.each do |key, value|
    define_method("#{key}?") do
      priority == value
    end
  end

  # Optionnel : setter par symbole
  def objectif_status=(val)
    super(val.is_a?(Symbol) ? OBJECTIF_STATUSES[val] : val)
  end

  def priority=(val)
    super(val.is_a?(Symbol) ? PRIORITIES[val] : val)
  end
end
