class Api::V1::TransactionsController < ApplicationController

  # GET /transactions
  def index
    transactions = Transaction.all
    transactions = transactions.where(cash_id: params[:cash_id]) if params[:cash_id]
    transactions = transactions.where(date_transaction: Date.parse("#{params[:month]}-01")..Date.parse("#{params[:month]}-01").end_of_month) if params[:month]
    render json: transactions
  end

  # POST /transactions
  def create
    transaction = Transaction.new(transaction_params)

    if transaction.save
      # Mise à jour du solde uniquement à la création
      cash = transaction.cash
      if transaction.type_transaction == "entree"
        cash.update(solde: cash.solde + transaction.montant)
      else
        cash.update(solde: cash.solde - transaction.montant)
      end

      render json: transaction, status: :created
    else
      render json: transaction.errors, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.require(:transaction).permit(
      :cash_id, :montant, :type_transaction,
      :categorie, :description, :date_transaction
    )
  end
end
