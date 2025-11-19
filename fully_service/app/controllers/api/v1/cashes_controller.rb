class Api::V1::CashesController < ApplicationController

  # GET /cashes
  def index
    cashes = Cash.all
    render json: cashes
  end

  # GET /cashes/:id
  def show
    cash = Cash.find(params[:id])
    render json: cash
  end

  # POST /cashes
  def create
    cash = Cash.new(cash_params)
    if cash.save
      render json: cash, status: :created
    else
      render json: cash.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /cashes/:id
  def update
    cash = Cash.find(params[:id])
    if cash.update(cash_params)
      render json: cash
    else
      render json: cash.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cashes/:id
  def destroy
    cash = Cash.find(params[:id])
    cash.destroy
    head :no_content
  end

  private

  def cash_params
    params.require(:cash).permit(:nom, :solde, :notes)
  end
end
