class Transaction < ApplicationRecord
  belongs_to :cash

  # Helpers pour vérifier le type
  def entree?
    type_transaction == "entree"
  end

  def sortie?
    type_transaction == "sortie"
  end
end
