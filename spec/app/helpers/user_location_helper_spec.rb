require 'spec_helper'

describe "BallinOctoAdventure::App::UserLocationHelper" do
  let(:helpers){ Class.new }
  before { helpers.extend BallinOctoAdventure::App::UserLocationHelper }
  subject { helpers }

  it "should return nil" do
    expect(subject.foo).to be_nil
  end
end
